import Foundation
import React

@objc(DevModeModule)
class DevModeModule: NSObject {
  
  @objc
  static func requiresMainQueueSetup() -> Bool {
    return false
  }
  
  @objc
  func isDevModeEnabled(_ resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) {
    // On iOS, "Developer Mode" toggle (iOS 16+) isn't easily accessible from third party app.
    // For now, we'll return false or you could check if the app is a debug build.
    #if DEBUG
      resolve(true)
    #else
      resolve(false)
    #endif
  }
}
