package com.ezo.dzhereback.service.admin;

import com.ezo.dzhereback.domain.Agency;
import com.ezo.dzhereback.domain.Lesson;
import com.ezo.dzhereback.domain.Member;
import com.ezo.dzhereback.dto.TeacherAddDto;
import com.ezo.dzhereback.dto.TeacherInfoDto;
import com.ezo.dzhereback.dto.TeacherUpdateDto;
import com.ezo.dzhereback.mapper.admin.TeacherAdminMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Arrays;
import java.util.List;

@Service
@Slf4j
public class TeacherAdminService {
    private final TeacherAdminMapper teacherAdminMapper;

    @Autowired
    public TeacherAdminService(TeacherAdminMapper teacherAdminMapper) {
        this.teacherAdminMapper = teacherAdminMapper;
    }

    public List<Agency> getAgencyList(){
        return teacherAdminMapper.findAgencyAll();
    }

    public List<Lesson> getLessonListByAgencyId(int agIdx){
        return teacherAdminMapper.findLessonListByAgencyId(agIdx);
    }

    public List<TeacherInfoDto> getTeacherListByLessonIdAndAgencyId(int cIdx, int agIdx){
        return teacherAdminMapper.findTeacherListByLessonIdAndAgencyId(cIdx, agIdx);
    }

    @Transactional
    public TeacherInfoDto createTeacher(TeacherAddDto teacherAddDto){
        try {
            System.out.println(teacherAddDto);
            int result = teacherAdminMapper.insertTeacher(teacherAddDto);
            log.info("insert query result : " + result);
            TeacherInfoDto resultInfo = teacherAdminMapper.findTeacherByPhone(teacherAddDto.getU_phone());
            return resultInfo;
        }catch (Exception e){
            log.info(e.getClass().getSimpleName());
            throw e;
        }
    }

    @Transactional
    public TeacherInfoDto updateTeacher(TeacherUpdateDto teacherUpdateDto){
        int result = -1;
        try{
            System.out.println(teacherUpdateDto);
            if((teacherUpdateDto.getU_phone()==null) && !(teacherUpdateDto.getU_email()==null))
                result = teacherAdminMapper.updateTeacherEmail(teacherUpdateDto);
            if(!(teacherUpdateDto.getU_phone()==null) && (teacherUpdateDto.getU_email()==null))
                result = teacherAdminMapper.updateTeacherPhone(teacherUpdateDto);
            if(!(teacherUpdateDto.getU_phone()==null) && !(teacherUpdateDto.getU_email()==null))
                result = teacherAdminMapper.updateTeacher(teacherUpdateDto);
            log.info("update query result : " + result);
            TeacherInfoDto resultInfo = teacherAdminMapper.findTeacherByIdx(teacherUpdateDto.getU_idx());
            return resultInfo;
        }catch (Exception e){
            log.info(e.getClass().getSimpleName());
            throw e;
        }
    }

    public int deleteTeacher(int[] uIdxes) {
        int result = -1;
        if(uIdxes.length==0)
            result = teacherAdminMapper.deleteTeacher(uIdxes[0]);
        else{
            String uIdxes_ = Arrays.toString(uIdxes).replace("[", "(").replace("]", ")").replaceAll(" ", "");
            System.out.println("u_idxes : " + uIdxes_);
            result = teacherAdminMapper.deleteTeachers(uIdxes_);
        }

        return result;
    }
}