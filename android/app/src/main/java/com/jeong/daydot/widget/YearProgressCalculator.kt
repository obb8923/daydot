package com.jeong.daydot.widget

import java.util.Calendar

object YearProgressCalculator {
    /**
     * 올해의 진행률을 계산합니다 (0.0 ~ 1.0)
     * iOS의 YearProgressCalculator.calculateProgress()와 동일한 로직
     */
    fun calculateProgress(): Double {
        val calendar = Calendar.getInstance()
        val now = calendar.time
        val year = calendar.get(Calendar.YEAR)
        
        // 올해 1월 1일
        val startOfYear = Calendar.getInstance().apply {
            set(Calendar.YEAR, year)
            set(Calendar.MONTH, Calendar.JANUARY)
            set(Calendar.DAY_OF_MONTH, 1)
            set(Calendar.HOUR_OF_DAY, 0)
            set(Calendar.MINUTE, 0)
            set(Calendar.SECOND, 0)
            set(Calendar.MILLISECOND, 0)
        }
        
        // 올해 12월 31일
        val endOfYear = Calendar.getInstance().apply {
            set(Calendar.YEAR, year)
            set(Calendar.MONTH, Calendar.DECEMBER)
            set(Calendar.DAY_OF_MONTH, 31)
            set(Calendar.HOUR_OF_DAY, 23)
            set(Calendar.MINUTE, 59)
            set(Calendar.SECOND, 59)
            set(Calendar.MILLISECOND, 999)
        }
        
        // 전체 일수
        val totalDays = ((endOfYear.timeInMillis - startOfYear.timeInMillis) / (1000 * 60 * 60 * 24)) + 1
        
        // 경과 일수
        val elapsedDays = ((calendar.timeInMillis - startOfYear.timeInMillis) / (1000 * 60 * 60 * 24)) + 1
        
        // 진행률 계산 (0.0 ~ 1.0)
        return elapsedDays.toDouble() / totalDays.toDouble()
    }
    
    /**
     * 진행률을 퍼센트로 반환 (0 ~ 100)
     */
    fun getProgressPercentage(): Int {
        return (calculateProgress() * 100).toInt()
    }
    
    /**
     * 남은 퍼센트를 반환 (0 ~ 100)
     */
    fun getRemainingPercentage(): Int {
        return ((1.0 - calculateProgress()) * 100).toInt()
    }
}

