//
//  WidgetDataManager.swift
//  daydot
//

import Foundation
import WidgetKit

@objc(WidgetDataManager)
class WidgetDataManager: NSObject {
  
  // App Group ID - Xcode에서 설정한 App Groups ID와 일치해야 함
  static let appGroupID = "group.com.jeong.daydot"
  
  // UserDefaults Keys
  private enum Keys {
    static let yearProgress = "yearProgress"
    static let daysLeft = "daysLeft"
    static let themeIndex = "themeIndex"
    static let lastUpdate = "lastUpdate"
  }
  
  // Shared UserDefaults
  private static var sharedDefaults: UserDefaults? {
    return UserDefaults(suiteName: appGroupID)
  }
  
  // 위젯 데이터 업데이트
  @objc
  static func requiresMainQueueSetup() -> Bool {
    return false
  }
  
  @objc
  func updateWidgetData(_ yearProgress: NSNumber,
                        daysLeft: NSNumber,
                        themeIndex: NSNumber) {
    guard let defaults = WidgetDataManager.sharedDefaults else {
      print("❌ Failed to access shared UserDefaults")
      return
    }
    
    // 데이터 저장
    defaults.set(yearProgress.doubleValue, forKey: Keys.yearProgress)
    defaults.set(daysLeft.intValue, forKey: Keys.daysLeft)
    defaults.set(themeIndex.intValue, forKey: Keys.themeIndex)
    defaults.set(Date(), forKey: Keys.lastUpdate)
    
    // 변경사항 즉시 저장
    defaults.synchronize()
    
    // 위젯 새로고침 트리거
    WidgetCenter.shared.reloadAllTimelines()
    
    print("✅ Widget data updated: progress=\(yearProgress)%, daysLeft=\(daysLeft), theme=\(themeIndex)")
  }
  
  // 위젯에서 읽을 데이터 구조
  struct WidgetData {
    let yearProgress: Double
    let daysLeft: Int
    let themeIndex: Int
    let lastUpdate: Date?
  }
  
  // 위젯에서 데이터 읽기
  static func getWidgetData() -> WidgetData {
    guard let defaults = sharedDefaults else {
      return WidgetData(yearProgress: 0, daysLeft: 0, themeIndex: 0, lastUpdate: nil)
    }
    
    let yearProgress = defaults.double(forKey: Keys.yearProgress)
    let daysLeft = defaults.integer(forKey: Keys.daysLeft)
    let themeIndex = defaults.integer(forKey: Keys.themeIndex)
    let lastUpdate = defaults.object(forKey: Keys.lastUpdate) as? Date
    
    return WidgetData(
      yearProgress: yearProgress,
      daysLeft: daysLeft,
      themeIndex: themeIndex,
      lastUpdate: lastUpdate
    )
  }
}

