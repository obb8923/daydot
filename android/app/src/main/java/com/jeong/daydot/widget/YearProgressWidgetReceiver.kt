package com.jeong.daydot.widget

import android.app.AlarmManager
import android.app.PendingIntent
import android.appwidget.AppWidgetManager
import android.appwidget.AppWidgetProvider
import android.content.Context
import android.content.Intent
import android.view.View
import android.widget.RemoteViews
import com.jeong.daydot.R
import java.util.Calendar
import java.util.Locale

class YearProgressWidgetReceiver : AppWidgetProvider() {
    override fun onAppWidgetOptionsChanged(
        context: Context,
        appWidgetManager: AppWidgetManager,
        appWidgetId: Int,
        newOptions: android.os.Bundle
    ) {
        super.onAppWidgetOptionsChanged(context, appWidgetManager, appWidgetId, newOptions)

        // 옵션 변경(사이즈 변경 포함) 시 레이아웃 재적용
        val remoteViews = createRemoteViews(context)
        appWidgetManager.updateAppWidget(appWidgetId, remoteViews)
    }
    
    override fun onUpdate(
        context: Context,
        appWidgetManager: AppWidgetManager,
        appWidgetIds: IntArray
    ) {
        for (appWidgetId in appWidgetIds) {
            val remoteViews = createRemoteViews(context)
            appWidgetManager.updateAppWidget(appWidgetId, remoteViews)
        }
        
        // 다음날 자정에 업데이트 스케줄링
        scheduleNextUpdate(context)
    }
    
    override fun onEnabled(context: Context) {
        super.onEnabled(context)
        
        // 위젯이 처음 추가될 때 다음날 자정에 업데이트 스케줄링
        scheduleNextUpdate(context)
    }
    
    override fun onDisabled(context: Context) {
        super.onDisabled(context)
        
        // 모든 위젯이 제거되면 스케줄 취소
        cancelScheduledUpdate(context)
    }
    
    // 다음날 자정에 위젯 업데이트를 스케줄링
    private fun scheduleNextUpdate(context: Context) {
        val alarmManager = context.getSystemService(Context.ALARM_SERVICE) as AlarmManager
        val intent = Intent(context, YearProgressWidgetReceiver::class.java).apply {
            action = android.appwidget.AppWidgetManager.ACTION_APPWIDGET_UPDATE
        }
        val pendingIntent = PendingIntent.getBroadcast(
            context,
            0,
            intent,
            PendingIntent.FLAG_UPDATE_CURRENT or PendingIntent.FLAG_IMMUTABLE
        )
        
        // 다음날 자정 시간 계산
        val calendar = Calendar.getInstance().apply {
            add(Calendar.DAY_OF_YEAR, 1)
            set(Calendar.HOUR_OF_DAY, 0)
            set(Calendar.MINUTE, 0)
            set(Calendar.SECOND, 0)
            set(Calendar.MILLISECOND, 0)
        }
        
        // AlarmManager로 정확한 시간에 알람 설정
        alarmManager.setExactAndAllowWhileIdle(
            AlarmManager.RTC_WAKEUP,
            calendar.timeInMillis,
            pendingIntent
        )
    }
    
    // 스케줄된 업데이트 취소
    private fun cancelScheduledUpdate(context: Context) {
        val alarmManager = context.getSystemService(Context.ALARM_SERVICE) as AlarmManager
        val intent = Intent(context, YearProgressWidgetReceiver::class.java).apply {
            action = android.appwidget.AppWidgetManager.ACTION_APPWIDGET_UPDATE
        }
        val pendingIntent = PendingIntent.getBroadcast(
            context,
            0,
            intent,
            PendingIntent.FLAG_UPDATE_CURRENT or PendingIntent.FLAG_IMMUTABLE
        )
        
        alarmManager.cancel(pendingIntent)
    }
    
    // RemoteViews 생성 (DotGrid 적용)
    private fun createRemoteViews(context: Context): RemoteViews {
        val remainingPercentage = YearProgressCalculator.getRemainingPercentage()
        val localizedText = getLocalizedSmallText(remainingPercentage)
        
        // 메인 레이아웃 생성
        val remoteViews = RemoteViews(context.packageName, R.layout.widget_layout)
        
        // 상단 텍스트 설정 (한 줄)
        remoteViews.setTextViewText(R.id.text_title, localizedText)
        
        // DotGrid 설정
        setupDotGrid(remoteViews, remainingPercentage)
        
        return remoteViews
    }
    
    
    // 점 그리드 설정 - DotGrid 방식으로 깔끔하게 처리 (10x10)
    private fun setupDotGrid(remoteViews: RemoteViews, remainingPercentage: Int) {
        val dotGridConfig = DotGridConfig(
            rowCount = 10,
            colCount = 10,
            totalDots = 100,
            remainingPercentage = remainingPercentage,
            orientation = DotOrientation.HORIZONTAL // Small 위젯은 오른쪽부터 채워짐
        )
        
        // 각 행과 열을 순회하며 점 설정
        for (row in 0 until dotGridConfig.rowCount) {
            for (col in 0 until dotGridConfig.colCount) {
                val dotId = getDotResourceId(row, col)
                val isWhiteDot = dotGridConfig.isWhiteDot(row, col)
                val dotDrawable = if (isWhiteDot) R.drawable.widget_dot_white else R.drawable.widget_dot_gray
                
                remoteViews.setImageViewResource(dotId, dotDrawable)
                remoteViews.setViewVisibility(dotId, View.VISIBLE)
            }
        }
    }
    
    // 점 그리드 설정 데이터 클래스 (10x10용)
    private data class DotGridConfig(
        val rowCount: Int,
        val colCount: Int,
        val totalDots: Int,
        val remainingPercentage: Int,
        val orientation: DotOrientation
    ) {
        val filledDots = (remainingPercentage * totalDots / 100f).toInt()
        
        fun isWhiteDot(row: Int, col: Int): Boolean {
            return when (orientation) {
                DotOrientation.HORIZONTAL -> {
                    // Small: 오른쪽부터 채우기
                    val index = row * colCount + col
                    index >= (totalDots - filledDots)
                }
                DotOrientation.VERTICAL -> {
                    // 아래쪽부터 채우기 (세로 우선)
                    val verticalIndex = col * rowCount + row
                    verticalIndex >= (totalDots - filledDots)
                }
            }
        }
    }
    
    // 점 방향 열거형
    private enum class DotOrientation {
        HORIZONTAL, // Small/Medium: 흰색 점들이 오른쪽
        VERTICAL    // Large: 흰색 점들이 아래쪽
    }
    
    
    //  행과 열에 따른 점 ID 반환 (10x10용)
    private fun getDotResourceId(row: Int, col: Int): Int {
        // R.id.dot_0_0, R.id.dot_0_1, ..., R.id.dot_9_9 형태로 ID 생성
        return when (row * 10 + col) {
            0 -> R.id.dot_0_0
            1 -> R.id.dot_0_1
            2 -> R.id.dot_0_2
            3 -> R.id.dot_0_3
            4 -> R.id.dot_0_4
            5 -> R.id.dot_0_5
            6 -> R.id.dot_0_6
            7 -> R.id.dot_0_7
            8 -> R.id.dot_0_8
            9 -> R.id.dot_0_9
            10 -> R.id.dot_1_0
            11 -> R.id.dot_1_1
            12 -> R.id.dot_1_2
            13 -> R.id.dot_1_3
            14 -> R.id.dot_1_4
            15 -> R.id.dot_1_5
            16 -> R.id.dot_1_6
            17 -> R.id.dot_1_7
            18 -> R.id.dot_1_8
            19 -> R.id.dot_1_9
            20 -> R.id.dot_2_0
            21 -> R.id.dot_2_1
            22 -> R.id.dot_2_2
            23 -> R.id.dot_2_3
            24 -> R.id.dot_2_4
            25 -> R.id.dot_2_5
            26 -> R.id.dot_2_6
            27 -> R.id.dot_2_7
            28 -> R.id.dot_2_8
            29 -> R.id.dot_2_9
            30 -> R.id.dot_3_0
            31 -> R.id.dot_3_1
            32 -> R.id.dot_3_2
            33 -> R.id.dot_3_3
            34 -> R.id.dot_3_4
            35 -> R.id.dot_3_5
            36 -> R.id.dot_3_6
            37 -> R.id.dot_3_7
            38 -> R.id.dot_3_8
            39 -> R.id.dot_3_9
            40 -> R.id.dot_4_0
            41 -> R.id.dot_4_1
            42 -> R.id.dot_4_2
            43 -> R.id.dot_4_3
            44 -> R.id.dot_4_4
            45 -> R.id.dot_4_5
            46 -> R.id.dot_4_6
            47 -> R.id.dot_4_7
            48 -> R.id.dot_4_8
            49 -> R.id.dot_4_9
            50 -> R.id.dot_5_0
            51 -> R.id.dot_5_1
            52 -> R.id.dot_5_2
            53 -> R.id.dot_5_3
            54 -> R.id.dot_5_4
            55 -> R.id.dot_5_5
            56 -> R.id.dot_5_6
            57 -> R.id.dot_5_7
            58 -> R.id.dot_5_8
            59 -> R.id.dot_5_9
            60 -> R.id.dot_6_0
            61 -> R.id.dot_6_1
            62 -> R.id.dot_6_2
            63 -> R.id.dot_6_3
            64 -> R.id.dot_6_4
            65 -> R.id.dot_6_5
            66 -> R.id.dot_6_6
            67 -> R.id.dot_6_7
            68 -> R.id.dot_6_8
            69 -> R.id.dot_6_9
            70 -> R.id.dot_7_0
            71 -> R.id.dot_7_1
            72 -> R.id.dot_7_2
            73 -> R.id.dot_7_3
            74 -> R.id.dot_7_4
            75 -> R.id.dot_7_5
            76 -> R.id.dot_7_6
            77 -> R.id.dot_7_7
            78 -> R.id.dot_7_8
            79 -> R.id.dot_7_9
            80 -> R.id.dot_8_0
            81 -> R.id.dot_8_1
            82 -> R.id.dot_8_2
            83 -> R.id.dot_8_3
            84 -> R.id.dot_8_4
            85 -> R.id.dot_8_5
            86 -> R.id.dot_8_6
            87 -> R.id.dot_8_7
            88 -> R.id.dot_8_8
            89 -> R.id.dot_8_9
            90 -> R.id.dot_9_0
            91 -> R.id.dot_9_1
            92 -> R.id.dot_9_2
            93 -> R.id.dot_9_3
            94 -> R.id.dot_9_4
            95 -> R.id.dot_9_5
            96 -> R.id.dot_9_6
            97 -> R.id.dot_9_7
            98 -> R.id.dot_9_8
            99 -> R.id.dot_9_9
            else -> R.id.dot_0_0
        }
    }
    
    
    // 위젯용 지역화된 텍스트 (한 줄)
    private fun getLocalizedSmallText(percentage: Int): String {
        val locale = Locale.getDefault()
        val currentYear = Calendar.getInstance().get(Calendar.YEAR)
        return if (locale.language == "ko") {
            "${currentYear}년 $percentage% 남음"
        } else {
            "$currentYear $percentage% Left"
        }
    }
}

