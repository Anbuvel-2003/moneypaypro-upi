#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(DevModeModule, NSObject)

RCT_EXTERN_METHOD(isDevModeEnabled:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject)

@end
