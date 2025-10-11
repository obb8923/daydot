//
//  WidgetDataManager.m
//  daydot
//

#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(WidgetDataManager, NSObject)

RCT_EXTERN_METHOD(updateWidgetData:(nonnull NSNumber *)yearProgress
                  daysLeft:(nonnull NSNumber *)daysLeft
                  themeIndex:(nonnull NSNumber *)themeIndex)

@end

