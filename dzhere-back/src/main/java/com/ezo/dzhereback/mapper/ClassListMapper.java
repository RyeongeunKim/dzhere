package com.ezo.dzhereback.mapper;
import java.util.List;
import org.apache.ibatis.annotations.*;
import com.ezo.dzhereback.domain.*;
import com.ezo.dzhereback.dto.*;

@Mapper
public interface ClassListMapper {
	// 소속 기관 및 관리자 정보
	@Select("select u.u_idx, u.u_phone, u.u_pw, u.u_email, u.u_alarm, u.u_name, u.u_accept, u.u_auth, a.ag_idx, a.ag_name from User as u join Agency as a on a.ag_idx=u.ag_idx and u.u_phone=#{u_phone}")
	AgencyDto selectAgencyName(@Param("u_phone") final String u_phone);

	// 소속 기관이 연 강의 리스트
	@Select("select * from Class where ag_idx=#{user.ag_idx}")
	List<ClassInfoDto> selectClassList(@Param("user") final User user);

	// 소속 기관이 연 강의의 수강생 리스트
	@Select("select * from User where ag_idx=#{user.ag_idx} and c_idx=#{user.c_idx}")
	List<UserDto> selectClassStudentList(@Param("user") final UserDto userDto);

	// 소속 기관이 연 강의 장소(classlocation) 리스트
	@Select("select c.c_idx, c.c_name, cl.cl_idx, cl.cl_name from Class as c join Classlocation as cl on c.c_idx = cl.c_idx where ag_idx=#{user.ag_idx}")
	List<ClasslocationDto> selectClassLocationList(@Param("user") final UserDto userDto);

	// 소속 기관이 연 강의 정보(classtime) 리스트
	@Select("select ct.ct_idx, ct.ct_day, ct.ct_start_time, ct.ct_end_time, ct.ct_attend_starttime, ct.ct_attend_endtime, ct.ct_start_date, ct.ct_end_date, ct.ct_break_start, ct.ct_break_end, cl.c_idx, cl.c_name from Classtime as ct join Class as cl on cl.c_idx=ct.c_idx and cl.ag_idx=#{user.ag_idx}")
	List<ClasstimeDto> selectClassTimeList(@Param("user") final UserDto userDto);

	// 소속 기관이 연 강의의 수강생 외부장소 등록 정보(external) 리스트
	@Select("select * from External where c_idx=#{user.c_idx} and u_idx in (select u_idx from User where u_name=#{user.u_name} and ag_idx=#{user.ag_idx} and u_accept=1 and u_auth=1)")
	List<ExternalDto> selectClassExternalList(@Param("user") final UserDto userDto);
	
	@Select("select * from Internal where c_idx=#{user.c_idx}")
	List<InternalDto> selectClassInternalList(@Param("user") final UserDto userDto);
	
	
//	@Insert("insert into Class(c_name, ag_idx) values (#{class.c_name}, #{class.ag_idx})")
//	void addClass(@Param("class") final ClasstimeDto classtimeDto);
	
//	@Select("select c_idx from Class where c_name=#{class.c_name}")
//	int selectClassId(@Param("class") final ClasstimeDto classtimeDto);
	
	@Insert("insert into Class(c_name, ag_idx) values (#{class.c_name}, #{class.ag_idx})")
	void addClass(@Param("class") final ClassInfoDto classinfoDto);
	
	@Select("select c_idx from Class where c_name=#{class.c_name}")
	int selectClassId(@Param("class") final ClassInfoDto classinfoDto);
	
	@Insert("insert into Classtime(ct_day, ct_start_time, ct_end_time, ct_attend_starttime, ct_attend_endtime, ct_start_date, ct_end_date, c_idx) values (#{class.ct_day}, #{class.ct_start_time}, #{class.ct_end_time}, #{class.ct_attend_starttime}, #{class.ct_attend_endtime}, #{class.ct_start_date},  #{class.ct_end_date}, #{class.c_idx})")
	void addClasstime(@Param("class") final ClasstimeDto classtimeDto);
	
	@Insert("insert into Classlocation(c_idx) values(#{c_idx})")
	void addClasslocation(@Param("c_idx") final int c_idx);
	
	@Delete("delete from Classtime where c_idx=#{c_idx}")
	void deleteClassTime(@Param("c_idx") final int c_idx);
	
	@Delete("delete from Class where c_idx=#{c_idx}")
	void deleteClassName(@Param("c_idx") final int c_idx);
	
	@Delete("delete from Classlocation where c_idx=#{c_idx}")
	void deleteClasslocation(@Param("c_idx") final int c_idx);
	
	@Delete("delete from Internal where c_idx=#{c_idx}")
	void deleteClassInternal(@Param("c_idx") final int c_idx);
	
	@Update("update Classlocation set cl_name=#{internal.cl_name} where c_idx=#{internal.c_idx}")
	void addClassLocation(@Param("internal") final InternalDto internalDto);
	
	@Insert("insert into Internal(i_name, i_ssid, i_bssid, ag_idx, c_idx) values(#{i.i_name}, #{i.i_ssid}, #{i.i_bssid}, #{i.ag_idx}, #{i.c_idx})")
	void addClassInternal(@Param("i") final InternalDto internalDto);
	
	//	// 소속 기관이 연 강의 정보(classtime) 리스트
	//	@Select("select * from Classtime where c_idx in (select c_idx from Class where ag_idx=#{user.ag_idx})")
	//	List<ClasstimeDto> selectClassTimeList(@Param("user") final UserDto userDto);
}
