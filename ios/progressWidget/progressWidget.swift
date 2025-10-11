//
//  progressWidget.swift
//  progressWidget
//
//  Created by 박정빈 on 10/11/25.
//

import WidgetKit
import SwiftUI

// MARK: - Localization Helper
struct LocalizedText {
    static func isKorean() -> Bool {
        let preferredLanguage = Locale.preferredLanguages.first ?? ""
        return preferredLanguage.hasPrefix("ko")
    }
    
    static func daysLeftText(_ days: Int) -> String {
        if isKorean() {
            return "\(days)일"
        } else {
            return "\(days) days"
        }
    }
    
    static func daysText(_ days: Int) -> String {
        if isKorean() {
            return "\(days)일"
        } else {
            return "\(days) days"
        }
    }
    
    static func yearProgressText() -> String {
        if isKorean() {
            return "올해의 진행"
        } else {
            return "Year Progress"
        }
    }
    
    static func dateText(year: Int, month: Int, day: Int) -> String {
        if isKorean() {
            return "\(year)년 \(month)월 \(day)일"
        } else {
            return "\(month)/\(day)/\(year)"
        }
    }
}

// MARK: - Theme Colors
struct ThemeColors {
    let primary: Color
    let background: Color
    let text: Color
    let caption: Color
    
    static func theme(for index: Int) -> ThemeColors {
        switch index {
        case 0:
            return ThemeColors(
                primary: Color(hex: "#fafafa"),
                background: Color(hex: "#0f0f0f"),
                text: Color(hex: "#fafafa"),
                caption: Color(hex: "#666666")
            )
        case 1:
            return ThemeColors(
                primary: Color(hex: "#014421"),
                background: Color(hex: "#D0D8C3"),
                text: Color(hex: "#212121"),
                caption: Color(hex: "#808080")
            )
        default:
            return theme(for: 0)
        }
    }
}

// Color extension for hex values
extension Color {
    init(hex: String) {
        let hex = hex.trimmingCharacters(in: CharacterSet.alphanumerics.inverted)
        var int: UInt64 = 0
        Scanner(string: hex).scanHexInt64(&int)
        let a, r, g, b: UInt64
        switch hex.count {
        case 3: // RGB (12-bit)
            (a, r, g, b) = (255, (int >> 8) * 17, (int >> 4 & 0xF) * 17, (int & 0xF) * 17)
        case 6: // RGB (24-bit)
            (a, r, g, b) = (255, int >> 16, int >> 8 & 0xFF, int & 0xFF)
        case 8: // ARGB (32-bit)
            (a, r, g, b) = (int >> 24, int >> 16 & 0xFF, int >> 8 & 0xFF, int & 0xFF)
        default:
            (a, r, g, b) = (255, 0, 0, 0)
        }
        self.init(
            .sRGB,
            red: Double(r) / 255,
            green: Double(g) / 255,
            blue:  Double(b) / 255,
            opacity: Double(a) / 255
        )
    }
}

// MARK: - Widget Data
struct WidgetData {
    let yearProgress: Double
    let daysLeft: Int
    let themeIndex: Int
    
    static func load() -> WidgetData {
        guard let defaults = UserDefaults(suiteName: "group.com.jeong.daydot") else {
            return WidgetData(yearProgress: 0, daysLeft: 0, themeIndex: 0)
        }
        
        let yearProgress = defaults.double(forKey: "yearProgress")
        let daysLeft = defaults.integer(forKey: "daysLeft")
        let themeIndex = defaults.integer(forKey: "themeIndex")
        
        return WidgetData(
            yearProgress: yearProgress,
            daysLeft: daysLeft,
            themeIndex: themeIndex
        )
    }
}

// MARK: - Timeline Provider
struct Provider: TimelineProvider {
    func placeholder(in context: Context) -> ProgressEntry {
        ProgressEntry(date: Date(), yearProgress: 75.0, daysLeft: 92, themeIndex: 0)
    }

    func getSnapshot(in context: Context, completion: @escaping (ProgressEntry) -> ()) {
        let data = WidgetData.load()
        let entry = ProgressEntry(
            date: Date(),
            yearProgress: data.yearProgress,
            daysLeft: data.daysLeft,
            themeIndex: data.themeIndex
        )
        completion(entry)
    }

    func getTimeline(in context: Context, completion: @escaping (Timeline<Entry>) -> ()) {
        let data = WidgetData.load()
        let currentDate = Date()
        
        // 현재 시간의 entry 생성
        let entry = ProgressEntry(
            date: currentDate,
            yearProgress: data.yearProgress,
            daysLeft: data.daysLeft,
            themeIndex: data.themeIndex
        )
        
        // 다음 날 자정에 업데이트되도록 설정
        let nextMidnight = Calendar.current.startOfDay(for: Calendar.current.date(byAdding: .day, value: 1, to: currentDate)!)
        
        let timeline = Timeline(entries: [entry], policy: .after(nextMidnight))
        completion(timeline)
    }
}

// MARK: - Timeline Entry
struct ProgressEntry: TimelineEntry {
    let date: Date
    let yearProgress: Double
    let daysLeft: Int
    let themeIndex: Int
}

// MARK: - Widget View
struct progressWidgetEntryView : View {
    var entry: Provider.Entry
    @Environment(\.widgetFamily) var family
    
    var theme: ThemeColors {
        ThemeColors.theme(for: entry.themeIndex)
    }
    
    var body: some View {
        switch family {
        case .systemSmall:
            SmallWidgetView(entry: entry, theme: theme)
        case .systemMedium:
            MediumWidgetView(entry: entry, theme: theme)
        default:
            SmallWidgetView(entry: entry, theme: theme)
        }
    }
}

// MARK: - Small Widget View
struct SmallWidgetView: View {
    let entry: ProgressEntry
    let theme: ThemeColors
    
    var body: some View {
        VStack(spacing: 0) {
            Spacer()
            
            // 진행률 표시
            Text("\(Int(entry.yearProgress))%")
                .font(.system(size: 36, weight: .bold, design: .rounded))
                .foregroundColor(theme.text)
            
            // 프로그레스 바
            GeometryReader { geometry in
                ZStack(alignment: .leading) {
                    // 배경 바
                    RoundedRectangle(cornerRadius: 4)
                        .fill(theme.caption.opacity(0.2))
                        .frame(height: 8)
                    
                    // 진행 바
                    RoundedRectangle(cornerRadius: 4)
                        .fill(theme.primary)
                        .frame(width: geometry.size.width * CGFloat(entry.yearProgress / 100.0), height: 8)
                }
            }
            .frame(height: 8)
            .padding(.horizontal, 8)
            .padding(.top, 8)
            
            Spacer()
            
            // 남은 일수
            Text(LocalizedText.daysText(entry.daysLeft))
                .font(.system(size: 18, weight: .semibold, design: .rounded))
                .foregroundColor(theme.text)
            
            Spacer()
        }
        .padding(16)
        .frame(maxWidth: .infinity, maxHeight: .infinity)
    }
}

// MARK: - Medium Widget View
struct MediumWidgetView: View {
    let entry: ProgressEntry
    let theme: ThemeColors
    
    var body: some View {
        HStack(spacing: 20) {
            // 왼쪽: 원형 프로그레스
            ZStack {
                Circle()
                    .stroke(theme.caption.opacity(0.2), lineWidth: 12)
                    .frame(width: 100, height: 100)
                
                Circle()
                    .trim(from: 0, to: CGFloat(entry.yearProgress / 100.0))
                    .stroke(theme.primary, style: StrokeStyle(lineWidth: 12, lineCap: .round))
                    .frame(width: 100, height: 100)
                    .rotationEffect(.degrees(-90))
                
                Text("\(Int(entry.yearProgress))%")
                    .font(.system(size: 28, weight: .bold, design: .rounded))
                    .foregroundColor(theme.text)
            }
            
            // 오른쪽: 텍스트 정보
            VStack(alignment: .leading, spacing: 8) {
                let calendar = Calendar.current
                let year = calendar.component(.year, from: Date())
                let month = calendar.component(.month, from: Date())
                let day = calendar.component(.day, from: Date())
                
                Text(LocalizedText.dateText(year: year, month: month, day: day))
                    .font(.system(size: 14, weight: .medium))
                    .foregroundColor(theme.caption)
                
                Text(LocalizedText.daysLeftText(entry.daysLeft))
                    .font(.system(size: 20, weight: .semibold, design: .rounded))
                    .foregroundColor(theme.text)
            }
            
            Spacer()
        }
        .padding(16)
        .frame(maxWidth: .infinity, maxHeight: .infinity)
    }
}

// MARK: - Widget Configuration
struct progressWidget: Widget {
    let kind: String = "progressWidget"

    var body: some WidgetConfiguration {
        StaticConfiguration(kind: kind, provider: Provider()) { entry in
            if #available(iOS 17.0, *) {
                progressWidgetEntryView(entry: entry)
                    .containerBackground(ThemeColors.theme(for: entry.themeIndex).background, for: .widget)
            } else {
                progressWidgetEntryView(entry: entry)
                    .padding()
                    .background(ThemeColors.theme(for: entry.themeIndex).background)
            }
        }
        .configurationDisplayName(LocalizedText.isKorean() ? "일년 진행률" : "Year Progress")
        .description(LocalizedText.isKorean() ? "올해가 얼마나 지나갔는지 확인하세요" : "Track your year's progress")
        .supportedFamilies([.systemSmall, .systemMedium])
    }
}

// MARK: - Preview
#Preview(as: .systemSmall) {
    progressWidget()
} timeline: {
    ProgressEntry(date: .now, yearProgress: 75.5, daysLeft: 92, themeIndex: 0)
    ProgressEntry(date: .now, yearProgress: 75.5, daysLeft: 92, themeIndex: 1)
}

#Preview(as: .systemMedium) {
    progressWidget()
} timeline: {
    ProgressEntry(date: .now, yearProgress: 75.5, daysLeft: 92, themeIndex: 0)
    ProgressEntry(date: .now, yearProgress: 75.5, daysLeft: 92, themeIndex: 1)
}
