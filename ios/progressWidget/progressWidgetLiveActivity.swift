//
//  progressWidgetLiveActivity.swift
//  progressWidget
//
//  Created by 박정빈 on 10/11/25.
//

import ActivityKit
import WidgetKit
import SwiftUI

struct progressWidgetAttributes: ActivityAttributes {
    public struct ContentState: Codable, Hashable {
        // Dynamic stateful properties about your activity go here!
        var emoji: String
    }

    // Fixed non-changing properties about your activity go here!
    var name: String
}

struct progressWidgetLiveActivity: Widget {
    var body: some WidgetConfiguration {
        ActivityConfiguration(for: progressWidgetAttributes.self) { context in
            // Lock screen/banner UI goes here
            VStack {
                Text("Hello \(context.state.emoji)")
            }
            .activityBackgroundTint(Color.cyan)
            .activitySystemActionForegroundColor(Color.black)

        } dynamicIsland: { context in
            DynamicIsland {
                // Expanded UI goes here.  Compose the expanded UI through
                // various regions, like leading/trailing/center/bottom
                DynamicIslandExpandedRegion(.leading) {
                    Text("Leading")
                }
                DynamicIslandExpandedRegion(.trailing) {
                    Text("Trailing")
                }
                DynamicIslandExpandedRegion(.bottom) {
                    Text("Bottom \(context.state.emoji)")
                    // more content
                }
            } compactLeading: {
                Text("L")
            } compactTrailing: {
                Text("T \(context.state.emoji)")
            } minimal: {
                Text(context.state.emoji)
            }
            .widgetURL(URL(string: "http://www.apple.com"))
            .keylineTint(Color.red)
        }
    }
}

extension progressWidgetAttributes {
    fileprivate static var preview: progressWidgetAttributes {
        progressWidgetAttributes(name: "World")
    }
}

extension progressWidgetAttributes.ContentState {
    fileprivate static var smiley: progressWidgetAttributes.ContentState {
        progressWidgetAttributes.ContentState(emoji: "😀")
     }
     
     fileprivate static var starEyes: progressWidgetAttributes.ContentState {
         progressWidgetAttributes.ContentState(emoji: "🤩")
     }
}

#Preview("Notification", as: .content, using: progressWidgetAttributes.preview) {
   progressWidgetLiveActivity()
} contentStates: {
    progressWidgetAttributes.ContentState.smiley
    progressWidgetAttributes.ContentState.starEyes
}
