package com.moneypaypro

import android.provider.Settings
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Promise

class DevModeModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String {
        return "DevModeModule"
    }

    @ReactMethod
    fun isDevModeEnabled(promise: Promise) {
        try {
            val devMode = Settings.Global.getInt(
                reactApplicationContext.contentResolver,
                Settings.Global.DEVELOPMENT_SETTINGS_ENABLED, 0
            ) != 0
            promise.resolve(devMode)
        } catch (e: Exception) {
            promise.reject("ERR_DEV_MODE", e.message)
        }
    }
}
