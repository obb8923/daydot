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
    static func getLocalizedText(for percentage: Int) -> String {
        let locale = Locale.current
        let languageCode = locale.language.languageCode?.identifier ?? "en"
        let currentYear = Calendar.current.component(.year, from: Date())
        
        if languageCode == "ko" {
            return "\(currentYear)년이 \(percentage)% 남았어요"
        } else {
            return "There's \(percentage)% of \(currentYear) left"
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
        
        GeometryReader { geometry in
            let minDimension = min(geometry.size.width, geometry.size.height)
            let dotSize = minDimension * 0.04
            let spacingVertical = minDimension * 0.04
            let spacingHorizontal = minDimension * 0.02
            
            VStack(spacing: minDimension * 0.08) {
                // 문구 표시
                Text(localizedText)
                    .font(.system(size: minDimension * 0.08, weight: .medium, design: .default))
                    .foregroundColor(Color(hex: "#fafafa"))
                    .multilineTextAlignment(.center)
                
                // 100개 점 그리드 (10x10) - 흰색 점들이 아래쪽에 위치하도록 세로 방향
                LazyVGrid(columns: Array(repeating: GridItem(.flexible(), spacing: spacingHorizontal), count: 10), spacing: spacingVertical) {
                    ForEach(0..<100, id: \.self) { index in
                        let row = index / 10
                        let col = index % 10
                        let totalWhiteDots = entry.remainingPercentage
                        
                        // 각 열마다 분배할 점의 개수 계산
                        // 추가 점수는 오른쪽 열부터 배분하여 회색점이 왼쪽에서부터 나오도록 함
                        let dotsPerColumn = totalWhiteDots / 10
                        let extraDots = totalWhiteDots % 10
                        let whiteDotsInColumn = dotsPerColumn + (col >= (10 - extraDots) && extraDots > 0 ? 1 : 0)
                        
                        // 아래쪽부터 채우기
                        let isWhiteDot = row >= (10 - whiteDotsInColumn)
                        
                        Circle()
                            .fill(isWhiteDot ? Color(hex: "#fafafa") : Color(hex: "#4D4D4D"))
                            .frame(width: dotSize, height: dotSize)
                            .shadow(color: isWhiteDot ? Color(hex: "#fafafa").opacity(0.2) : Color.clear, radius: isWhiteDot ? dotSize * 0.64 : 0, x: isWhiteDot ? dotSize * 0.17 : 0, y: isWhiteDot ? dotSize * 0.17 : 0)
                    }
                }
                .padding(.horizontal, minDimension * 0.05)
            }
            .frame(maxWidth: .infinity, maxHeight: .infinity)
        }
    }
}

// MARK: - Medium Widget View
struct MediumWidgetView: View {
    let entry: YearProgressEntry
    
    var body: some View {
        let localizedText = WidgetLocalization.getLocalizedText(for: entry.remainingPercentage)
        
        GeometryReader { geometry in
            let minDimension = min(geometry.size.width, geometry.size.height)
            let dotSize = minDimension * 0.04
            let spacingVertical = minDimension * 0.04
            let spacingHorizontal = minDimension * 0.015
            
            VStack(spacing: minDimension * 0.1) {
                // 문구와 퍼센트 표시
                Text(localizedText)
                    .font(.system(size: minDimension * 0.1, weight: .medium, design: .default))
                    .foregroundColor(Color(hex: "#fafafa"))
                    .multilineTextAlignment(.center)
                
                // 100개 점 그리드 (10x10) - 흰색 점들이 오른쪽에 위치하도록 수정
                LazyVGrid(columns: Array(repeating: GridItem(.flexible(), spacing: spacingHorizontal), count: 10), spacing: spacingVertical) {
                    ForEach(0..<100, id: \.self) { index in
                        let row = index / 10
                        let col = index % 10
                        let totalWhiteDots = entry.remainingPercentage
                        
                        // 각 행마다 분배할 점의 개수 계산
                        let dotsPerRow = totalWhiteDots / 10
                        let extraDots = totalWhiteDots % 10
                        
                        // 현재 행에서 하얀점의 개수 (마지막 행부터 추가 점 배분)
                        let whiteDotsInRow = dotsPerRow + (row >= (10 - extraDots) && extraDots > 0 ? 1 : 0)
                        
                        // 오른쪽부터 채우기
                        let isWhiteDot = col >= (10 - whiteDotsInRow)
                        
                        Circle()
                            .fill(isWhiteDot ? Color(hex: "#fafafa") : Color(hex: "#4D4D4D"))
                            .frame(width: dotSize, height: dotSize)
                            .shadow(color: isWhiteDot ? Color(hex: "#fafafa").opacity(0.2) : Color.clear, radius: isWhiteDot ? dotSize * 0.64 : 0, x: isWhiteDot ? dotSize * 0.17 : 0, y: isWhiteDot ? dotSize * 0.17 : 0)
                    }
                }
                .padding(.horizontal, minDimension * 0.1)
            }
            .frame(maxWidth: .infinity, maxHeight: .infinity)
        }
    }
}

// MARK: - Large Widget View
struct LargeWidgetView: View {
    let entry: YearProgressEntry
    
    var body: some View {
        let localizedText = WidgetLocalization.getLocalizedText(for: entry.remainingPercentage)
        
        GeometryReader { geometry in
            let minDimension = min(geometry.size.width, geometry.size.height)
            let dotSize = minDimension * 0.018
            let spacingVertical = minDimension * 0.06
            let spacingHorizontal = minDimension * 0.015
            
            VStack(spacing: minDimension * 0.12) {
                // 문구와 퍼센트 표시
                Text(localizedText)
                    .font(.system(size: minDimension * 0.05, weight: .medium, design: .default))
                    .foregroundColor(Color(hex: "#fafafa"))
                    .multilineTextAlignment(.center)
                
                // 100개 점 그리드 (10x10) - 흰색 점들이 아래쪽에 위치하도록
                LazyVGrid(columns: Array(repeating: GridItem(.flexible(), spacing: spacingHorizontal), count: 10), spacing: spacingVertical) {
                    ForEach(0..<100, id: \.self) { index in
                        let row = index / 10
                        let col = index % 10
                        let totalWhiteDots = entry.remainingPercentage
                        
                        // 각 열마다 분배할 점의 개수 계산
                        // 추가 점수는 오른쪽 열부터 배분하여 회색점이 왼쪽에서부터 나오도록 함
                        let dotsPerColumn = totalWhiteDots / 10
                        let extraDots = totalWhiteDots % 10
                        let whiteDotsInColumn = dotsPerColumn + (col >= (10 - extraDots) && extraDots > 0 ? 1 : 0)
                        
                        // 아래쪽부터 채우기
                        let isWhiteDot = row >= (10 - whiteDotsInColumn)
                        
                        Circle()
                            .fill(isWhiteDot ? Color(hex: "#fafafa") : Color(hex: "#4D4D4D"))
                            .frame(width: dotSize, height: dotSize)
                            .shadow(color: isWhiteDot ? Color(hex: "#fafafa").opacity(0.2) : Color.clear, radius: isWhiteDot ? dotSize * 0.64 : 0, x: isWhiteDot ? dotSize * 0.17 : 0, y: isWhiteDot ? dotSize * 0.17 : 0)
                    }
                }
                .padding(.horizontal, minDimension * 0.08)
            }
            .frame(maxWidth: .infinity, maxHeight: .infinity)
            .padding(.vertical, minDimension * 0.08)
        }
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
                .containerBackground(Color(hex: "#0F0F0F"), for: .widget)
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
