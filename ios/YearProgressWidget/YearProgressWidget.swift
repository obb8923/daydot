//
//  YearProgressWidget.swift
//  YearProgressWidget
//
//  Created by 박정빈 on 10/18/25.
//

import WidgetKit
import SwiftUI

// MARK: - Localization Helper
struct WidgetLocalization {
    static func getLocalizedText(for percentage: Int) -> (smallTop: String, smallBottom: String, medium: String, large: String) {
        let locale = Locale.current
        let languageCode = locale.language.languageCode?.identifier ?? "en"
        
        if languageCode == "ko" {
            // 한국어
            return (
                smallTop: "2025년이",
                smallBottom: "남았어요",
                medium: "2025년이 \(percentage)% 남았어요",
                large: "2025년이 \(percentage)% 남았어요"
            )
        } else {
            // 영어 (기본)
            return (
                smallTop: "2025 is",
                smallBottom: "remaining",
                medium: "There's \(percentage)% of 2025 left",
                large: "There's \(percentage)% of 2025 left"
            )
        }
    }
    
    static func getLocalizedDescription() -> String {
        let locale = Locale.current
        let languageCode = locale.language.languageCode?.identifier ?? "en"
        
        if languageCode == "ko" {
            return "올해가 얼마나 남았는지 확인하세요"
        } else {
            return "Check how much of the year is remaining"
        }
    }
}
struct YearProgressCalculator {
    static func calculateProgress() -> Double {
        let calendar = Calendar.current
        let now = Date()
        let year = calendar.component(.year, from: now)
        
        // 올해 1월 1일
        let startOfYear = calendar.date(from: DateComponents(year: year, month: 1, day: 1))!
        // 올해 12월 31일
        let endOfYear = calendar.date(from: DateComponents(year: year, month: 12, day: 31))!
        
        // 전체 일수
        let totalDays = calendar.dateComponents([.day], from: startOfYear, to: endOfYear).day! + 1
        
        // 경과 일수
        let elapsedDays = calendar.dateComponents([.day], from: startOfYear, to: now).day! + 1
        
        // 진행률 계산 (0.0 ~ 1.0)
        return Double(elapsedDays) / Double(totalDays)
    }
    
    static func getProgressPercentage() -> Int {
        return Int(calculateProgress() * 100)
    }
}

// MARK: - Timeline Provider
struct Provider: TimelineProvider {
    func placeholder(in context: Context) -> YearProgressEntry {
        YearProgressEntry(date: Date(), progress: 0.71)
    }

    func getSnapshot(in context: Context, completion: @escaping (YearProgressEntry) -> ()) {
        let progress = YearProgressCalculator.calculateProgress()
        let entry = YearProgressEntry(date: Date(), progress: progress)
        completion(entry)
    }

    func getTimeline(in context: Context, completion: @escaping (Timeline<Entry>) -> ()) {
        var entries: [YearProgressEntry] = []
        let calendar = Calendar.current
        let now = Date()
        
        // 현재 진행률로 엔트리 생성
        let progress = YearProgressCalculator.calculateProgress()
        let currentEntry = YearProgressEntry(date: now, progress: progress)
        entries.append(currentEntry)
        
        // 다음날 자정 시간 계산
        if let tomorrow = calendar.date(byAdding: .day, value: 1, to: now),
           let nextMidnight = calendar.date(bySettingHour: 0, minute: 0, second: 0, of: tomorrow) {
            let nextProgress = YearProgressCalculator.calculateProgress()
            let nextEntry = YearProgressEntry(date: nextMidnight, progress: nextProgress)
            entries.append(nextEntry)
        }
        
        // 매일 자정에 업데이트
        let timeline = Timeline(entries: entries, policy: .atEnd)
        completion(timeline)
    }
}

// MARK: - Entry
struct YearProgressEntry: TimelineEntry {
    let date: Date
    let progress: Double // 0.0 ~ 1.0
    
    var percentage: Int {
        return Int(progress * 100)
    }
    
    var remainingPercentage: Int {
        return Int((1.0 - progress) * 100)
    }
}

// MARK: - Small Widget View
struct SmallWidgetView: View {
    let entry: YearProgressEntry
    
    var body: some View {
        let localizedText = WidgetLocalization.getLocalizedText(for: entry.remainingPercentage)
        
        VStack(spacing: 8) {
            Text(localizedText.smallTop)
                .font(.system(size: 16, weight: .medium, design: .default))
                .foregroundColor(Color(hex: "#fafafa"))
            
            Text("\(entry.remainingPercentage)%")
                .font(.system(size: 42, weight: .bold, design: .rounded))
                .foregroundColor(Color(hex: "#fafafa"))
            
            Text(localizedText.smallBottom)
                .font(.system(size: 16, weight: .medium, design: .default))
                .foregroundColor(Color(hex: "#fafafa"))
        }
        .frame(maxWidth: .infinity, maxHeight: .infinity)
    }
}

// MARK: - Medium Widget View
struct MediumWidgetView: View {
    let entry: YearProgressEntry
    
    var body: some View {
        let localizedText = WidgetLocalization.getLocalizedText(for: entry.remainingPercentage)
        
        VStack(spacing: 16) {
            // 문구와 퍼센트 표시
            Text(localizedText.medium)
                .font(.system(size: 20, weight: .medium, design: .default))
                .foregroundColor(Color(hex: "#fafafa"))
                .multilineTextAlignment(.center)
            
            // 프로그레스 바 (남은 부분 표시)
            GeometryReader { geometry in
                ZStack(alignment: .leading) {
                    // 배경 바
                    RoundedRectangle(cornerRadius: 8)
                        .fill(Color(hex: "#666666"))
                        .frame(height: 16)
                    
                    // 남은 부분 바 (오른쪽부터 채워짐)
                    RoundedRectangle(cornerRadius: 8)
                        .fill(Color(hex: "#fafafa"))
                        .frame(width: geometry.size.width * (1.0 - entry.progress), height: 16)
                        .offset(x: geometry.size.width * entry.progress)
                }
            }
            .frame(height: 16)
            .padding(.horizontal, 20)
        }
        .frame(maxWidth: .infinity, maxHeight: .infinity)
        .padding(.vertical, 20)
    }
}

// MARK: - Large Widget View
struct LargeWidgetView: View {
    let entry: YearProgressEntry
    
    var body: some View {
        let localizedText = WidgetLocalization.getLocalizedText(for: entry.remainingPercentage)
        
        VStack(spacing: 16) {
            // 문구와 퍼센트 표시
            Text(localizedText.large)
                .font(.system(size: 18, weight: .medium, design: .default))
                .foregroundColor(Color(hex: "#fafafa"))
                .multilineTextAlignment(.center)
            
            // 100개 점 그리드 (10x10) - 흰색 점들이 아래쪽에 위치하도록 수정
            LazyVGrid(columns: Array(repeating: GridItem(.flexible(), spacing: 2), count: 10), spacing: 16) {
                ForEach(0..<100, id: \.self) { index in
                    let row = index / 10
                    let col = index % 10
                    let dotsInColumn = entry.remainingPercentage / 10
                    let isWhiteDot = row >= (10 - dotsInColumn)
                    
                    Circle()
                        .fill(isWhiteDot ? Color(hex: "#fafafa") : Color(hex: "#4D4D4D"))
                        .frame(width: 6, height: 6)
                        .shadow(color: isWhiteDot ? Color(hex: "#fafafa").opacity(0.2) : Color.clear, radius: isWhiteDot ? 3.84 : 0, x: isWhiteDot ? 1 : 0, y: isWhiteDot ? 1 : 0)
                }
            }
            .padding(.horizontal, 20)
        }
        .frame(maxWidth: .infinity, maxHeight: .infinity)
        .padding(.vertical, 20)
    }
}
struct YearProgressWidgetEntryView : View {
    @Environment(\.widgetFamily) var family
    var entry: Provider.Entry

    var body: some View {
        switch family {
        case .systemSmall:
            SmallWidgetView(entry: entry)
        case .systemMedium:
            MediumWidgetView(entry: entry)
        case .systemLarge:
            LargeWidgetView(entry: entry)
        default:
            SmallWidgetView(entry: entry)
        }
    }
}

// MARK: - Widget
struct YearProgressWidget: Widget {
    let kind: String = "YearProgressWidget"

    var body: some WidgetConfiguration {
        StaticConfiguration(kind: kind, provider: Provider()) { entry in
            YearProgressWidgetEntryView(entry: entry)
                .containerBackground(Color(hex: "#212121"), for: .widget)
        }
        .configurationDisplayName("Year Progress")
        .description(WidgetLocalization.getLocalizedDescription())
        .supportedFamilies([.systemSmall, .systemMedium, .systemLarge])
    }
}

// MARK: - Color Extension
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
            blue: Double(b) / 255,
            opacity: Double(a) / 255
        )
    }
}

// MARK: - Previews
#Preview(as: .systemSmall) {
    YearProgressWidget()
} timeline: {
    YearProgressEntry(date: .now, progress: 0.71)
    YearProgressEntry(date: .now, progress: 0.85)
}

#Preview(as: .systemMedium) {
    YearProgressWidget()
} timeline: {
    YearProgressEntry(date: .now, progress: 0.71)
    YearProgressEntry(date: .now, progress: 0.85)
}

#Preview(as: .systemLarge) {
    YearProgressWidget()
} timeline: {
    YearProgressEntry(date: .now, progress: 0.71)
    YearProgressEntry(date: .now, progress: 0.85)
}
