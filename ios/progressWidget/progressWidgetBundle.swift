//
//  progressWidgetBundle.swift
//  progressWidget
//
//  Created by 박정빈 on 10/11/25.
//

import WidgetKit
import SwiftUI

@main
struct progressWidgetBundle: WidgetBundle {
    var body: some Widget {
        progressWidget()
        progressWidgetLiveActivity()
    }
}
