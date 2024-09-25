package org.cocos2dx.javascript.javascript;

import android.annotation.SuppressLint;
import android.app.Activity;
import android.app.Service;
import android.content.ClipData;
import android.content.ClipboardManager;
import android.content.Context;
import android.content.pm.ActivityInfo;
import android.os.Vibrator;
import android.util.Log;

import org.cocos2dx.javascript.AppActivity;
import org.cocos2dx.javascript.AppConstant;
import org.cocos2dx.javascript.SDKWrapper;
import org.cocos2dx.javascript.tools.DeviceUtils;
import org.cocos2dx.javascript.tools.StringUtil;
import org.cocos2dx.javascript.tools.ScreenConfig;
import org.cocos2dx.javascript.tools.device.DeviceInfoTool;
import org.cocos2dx.lib.Cocos2dxJavascriptJavaBridge;

import java.io.BufferedInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Enumeration;
import java.util.zip.ZipEntry;
import java.util.zip.ZipFile;
import java.util.zip.ZipInputStream;

public class Native {
    //获取Native版本
    public static String getNativeVersion(String hallVersion) {
        if (!StringUtil.StringEmpty(hallVersion)) {
            AppConstant.hallVersion = hallVersion;
        }
        return DeviceUtils.getVersionName();
    }

    //处理返回按钮
    public static void onBackPressed() {
        evalJsString(String.format("cc.ni.onJavaCallback('%s')", "Event_APP_back_pressed"));
    }

    //退出应用程序
    public static void exitApplication() {
        AppActivity app = (AppActivity) SDKWrapper.getInstance().getContext();
        app.finish();
    }


    //设置屏幕转向 1=横屏 2=竖屏
    @SuppressLint("SourceLockedOrientationActivity")
    public static void setOrientation(int orientation) {
        AppActivity app = (AppActivity) (SDKWrapper.getInstance().getContext());
        if (orientation == 1) {
            app.setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_SENSOR_LANDSCAPE);
        } else {
            app.setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_SENSOR_PORTRAIT);
        }
    }

    //执行COCOSJS代码
    public static void evalJsString(final String jsStr) {
        AppActivity app = (AppActivity) (SDKWrapper.getInstance().getContext());
        app.runOnGLThread(new Runnable() {
            @Override
            public void run() {
                Cocos2dxJavascriptJavaBridge.evalString(jsStr);
            }
        });
    }

    //获取Udid
    public static String getPhoneUdid() {
//        String deviceId = DB_UserPrivateDevice.getOpenUDID();
        return DeviceInfoTool.getUDID();
    }

    //获取IDFA
    public static String getPhoneIdfa() {
//        String deviceId = DeviceInfoTool.getIDFA();
        return DeviceInfoTool.getIDFA();
    }

    //获取device id
    public static String getDeviceId() {
        String deviceId = DeviceInfoTool.getDeviceInfo((Activity) SDKWrapper.getInstance().getContext());
        return deviceId;
    }

    //获取device id
    public static String getUserAgent() {
        Log.d("abcxxxx ", DeviceUtils.getAndroidUA());
        return DeviceUtils.getAndroidUA();
    }


    public static String getScreenSizeOfDevice() {
        return ScreenConfig.getScreenSize();
    }

    /**
     * 初始化客服
     *
     * @param key
     */
//    public static void initTenjin(String key) {
//        TenjinManager.init(key);
//    }

    /**
     * 初始化客服
     *
     * @param id
     * @param key
     */
    public static void initFreshchat(String id, String key) {
//        LooperTool.UiRun(new Runnable() {
//            @Override
//            public void run() {
//                OpenFreshTool.initFreshchat(id, key);
//            }
//        });
//        OpenFreshTool.initFreshchat(id, key);
    }

    /**
     * 初始化用户
     *
     * @param uid
     */
    public static void initFreshchatUser(String uid) {
//        LooperTool.UiRun(new Runnable() {
//            @Override
//            public void run() {
//                OpenFreshTool.initFreshchatUser(uid);
//                OpenFreshTool.showConversations();
//            }
//        });
    }

    /**
     * open kefu
     */
    public static void showConversations() {
//        OpenFreshTool.showConversations();
    }

    /**
     * 发送客服信息
     *
     * @param content 内容
     * @param tag
     */
    public static void freshchatSendMsg(String content, String tag) {
//        OpenFreshTool.sendMsg(content, tag);
    }

    /**
     * 复制到粘贴板
     *
     * @param content
     */
    public static void ClipboardManager(String content) {
        try {
            //复制
            ClipboardManager cm = (ClipboardManager) SDKWrapper.getInstance().getContext().getSystemService(Context.CLIPBOARD_SERVICE);
            // 将文本内容放到系统剪贴板里。
            cm.setText(content);
        } catch (Exception e) {

        }
    }

    /**
     * 震动
     */
    public static void phoneVibrator() {
        try {
            ((Vibrator) SDKWrapper.getInstance().getContext().getSystemService(Service.VIBRATOR_SERVICE)).vibrate(30);
        } catch (Exception e) {

        }
    }

    public static void testTest(String str) {
        evalJsString(String.format("cc.ni.onJavaCallback('%s','%s')", "Event_testTest", str));
    }

    public static void copyToClipboard(String context) {
        AppActivity activity = (AppActivity) SDKWrapper.getInstance().getContext();
        activity.runOnUiThread(new Runnable() {
            @Override
            public void run() {
                ClipboardManager myClipboard = (ClipboardManager)activity.getSystemService(Context.CLIPBOARD_SERVICE);
                ClipData myClip = ClipData.newPlainText("text", context);
                myClipboard.setPrimaryClip(myClip);
            }
        });
    }

	private static final String tag = "Slot";
	private static String[] funNames = {"unzip",};
	private static final String EVENT_UNZIP = "EVENT_UNZIP";
	/** js端检测方法是否存在 */
	public static int isFunExist(String name) {
		int ret = -1;
		for(String str:funNames) {
			if (str.equals(name)) {
				ret = 1;
				break;
			}
		}
		Log.d(tag,"ret "+ret);
		return ret;
	}

	/**
	 * 安卓原生解压代码 每次读取8KB
	 * @return -1:解压的zip文件不存在.
	 * 		   -2:创建文件夹目录失败.
	 * 		   其他值:解压进度.
	 */
	private static final int BUFFER_SIZE = 8192;
	public static void unzip(String bundleName) {
		new Thread(() -> {
			//记录开始时间
			long startTime = System.currentTimeMillis();
			Log.d(tag, "unzip start ,bundleName " + bundleName);
			try {
				Context context = SDKWrapper.getInstance().getContext();
				String writeablePath = context.getFilesDir().getAbsolutePath();
				Log.d(tag,"writeablePath " + writeablePath);
				//不用处理文件名后缀不是zip的情况
				String zipFileName = bundleName;
				String zipFilePath = writeablePath + File.separator + zipFileName;
				Log.d(tag,zipFilePath );
				File archive = new File(zipFilePath);
				if (!archive.exists()) {
					Log.d(tag,zipFilePath + " does not exist!");
					evalJsString(String.format("cc.ni.onJavaCallback('%s','%s','%s');", EVENT_UNZIP,bundleName, "-1"));
					return;
				}
				String destPath = context.getFilesDir().getAbsolutePath();
				File destDir = new File(destPath);
				if (!destDir.exists()) {
					if (!destDir.mkdirs()) {
						Log.d(tag,"Failed to create target directory!");
						evalJsString(String.format("cc.ni.onJavaCallback('%s','%s','%s');", EVENT_UNZIP,bundleName, "-2"));
						return;
					}
				}

				// 计算所有被压缩的文件的原始大小总和
				long totalSize = 0;
				ZipFile zipFile = new ZipFile(zipFilePath);
				Enumeration<? extends ZipEntry> entries = zipFile.entries();
				while (entries.hasMoreElements()) {
					ZipEntry ze = entries.nextElement();
					totalSize += ze.getSize();
				}
				zipFile.close();

				long extractedSize = 0;
				byte[] buffer = new byte[BUFFER_SIZE];
				FileInputStream fileInputStream = new FileInputStream(zipFilePath);
				ZipInputStream zipInputStream = new ZipInputStream(new BufferedInputStream(fileInputStream));
				ZipEntry zipEntry;
				int oldProgress = 0;
				while ((zipEntry = zipInputStream.getNextEntry()) != null) {
					File file = new File(destPath, zipEntry.getName());
					File dir = zipEntry.isDirectory() ? file : file.getParentFile();
					if (!dir.isDirectory() && !dir.mkdirs())
						throw new IOException("Failed to ensure directory: " + dir.getAbsolutePath());
					if (zipEntry.isDirectory())
						continue;
					FileOutputStream outputStream = new FileOutputStream(file);
					int count = 0;
					while ((count = zipInputStream.read(buffer)) != -1) {
						extractedSize += count;
						outputStream.write(buffer, 0, count);
					}
					int progress = (int) ((double) extractedSize / totalSize * 100);
					if (oldProgress != progress) {
						oldProgress = progress;
//						Log.d(tag,String.format("bundle %s progress %s",bundleName,progress));
						evalJsString(String.format("cc.ni.onJavaCallback('%s','%s','%s','%s');", EVENT_UNZIP,bundleName, progress,totalSize));
					}

					outputStream.close();
					zipInputStream.closeEntry();
				}
				zipInputStream.close();
				long endTime = System.currentTimeMillis();
				Log.d(tag, "unzip end, cost time: " + (endTime - startTime)/1000 + "s");
			} catch (IOException e) {
				evalJsString(String.format("cc.ni.onJavaCallback('%s','%s','%s');", EVENT_UNZIP,bundleName, "-3"));
				e.printStackTrace();
			}
		}).start();
	}


}