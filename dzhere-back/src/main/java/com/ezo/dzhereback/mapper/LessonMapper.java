package com.ezo.dzhereback.mapper;

import java.util.List;
import com.ezo.dzhereback.domain.Lesson;
import com.ezo.dzhereback.domain.Lessontime;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

@Mapper
public interface LessonMapper {
    @Select("SELECT * FROM Class")
    List<Lesson> getLessonList();

    @Select("select c_name from Class where c_idx = #{c_idx}")
    Lesson getLesson(int c_idx);

    @Select("select c_idx from User where u_phone=#{u_phone}")
    int getCidx(String u_phone);

    @Select("SELECT * FROM Classtime WHERE c_idx = #{c_idx}")
    List<Lessontime> getLessonTimeList(int c_idx);
}
