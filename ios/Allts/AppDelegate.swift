import UIKit
import React
import Notifee
import React_RCTAppDelegate
import ReactAppDependencyProvider
import UserNotifications

@main
class AppDelegate: RCTAppDelegate {
  
  override func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey : Any]? = nil) -> Bool {
    self.moduleName = "Allts"
    self.dependencyProvider = RCTAppDependencyProvider()

    // 초기 props 설정
    self.initialProps = [:]
    
    // Notifee 초기화
    Notifee.onAppBootstrap()
    
    // 알림 권한 요청
    requestNotificationPermission()

    return super.application(application, didFinishLaunchingWithOptions: launchOptions)
  }

  // 권한 요청 함수
  func requestNotificationPermission() {
    UNUserNotificationCenter.current().requestAuthorization(options: [.alert, .sound, .badge]) { granted, error in
      if granted {
        print("알림 권한이 허용되었습니다.")
      } else {
        print("알림 권한이 거부되었습니다.")
      }
    }
    
    // 푸시 알림 등록
    UIApplication.shared.registerForRemoteNotifications()
  }

  override func sourceURL(for bridge: RCTBridge) -> URL? {
    self.bundleURL()
  }

  override func bundleURL() -> URL? {
#if DEBUG
    return RCTBundleURLProvider.sharedSettings().jsBundleURL(forBundleRoot: "index")
#else
    return Bundle.main.url(forResource: "main", withExtension: "jsbundle")
#endif
  }
}
