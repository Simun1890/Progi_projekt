package com.ozdravi.ozdravig11t4.rest;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ozdravi.ozdravig11t4.dao.ChildExaminationsRepository;
import com.ozdravi.ozdravig11t4.dao.MedicalCertificatesRepository;
import com.ozdravi.ozdravig11t4.dao.NotificationsRepository;
import com.ozdravi.ozdravig11t4.dao.TestResultsRepository;
import com.ozdravi.ozdravig11t4.dao.UserLogRepository;
import com.ozdravi.ozdravig11t4.domain.Child;
import com.ozdravi.ozdravig11t4.domain.ChildExaminations;
import com.ozdravi.ozdravig11t4.domain.MedicalCertificates;
import com.ozdravi.ozdravig11t4.domain.Notifications;
import com.ozdravi.ozdravig11t4.domain.TestResults;
import com.ozdravi.ozdravig11t4.domain.User;
import com.ozdravi.ozdravig11t4.domain.UserLog;
import com.ozdravi.ozdravig11t4.domain.UserRole;
import com.ozdravi.ozdravig11t4.service.ChildService;
import com.ozdravi.ozdravig11t4.service.UserService;

@RestController
@RequestMapping("/other")
public class OtherController {
    
    @Autowired
    private NotificationsRepository notifRepo;

    @Autowired
    private ChildExaminationsRepository childExamRepo;

    @Autowired
    private MedicalCertificatesRepository medCertRepo;

    @Autowired
    private UserService userService;

    @Autowired
    private ChildService childService;

    @Autowired
    private TestResultsRepository testResultsRepo;

    @Autowired
    private UserLogRepository userLogRepo;

    @PostMapping("/postNewAppointment")
    public ResponseEntity<String> postNewAppointment(@RequestBody Map<String, Object> requestMap) {
        String dateOfExam = (String) requestMap.get("date");
        String pediatritionOib = (String) requestMap.get("staffOib");
        String oibChild = (String) (requestMap.get("childOib"));
        if(dateOfExam==null)
            throw new IllegalArgumentException("Date of appointment is missing!");
        User newUser = new User(); 
        newUser = userService.findByOib(pediatritionOib);
        Child ch = childService.findByOib(oibChild);
        if(newUser == null)
            throw new IllegalArgumentException("Doctor not found!");
        if(ch == null)
            throw new IllegalArgumentException("Child not found!");
        ChildExaminations childExam = new ChildExaminations();
        childExam.setOibChild(ch);
        childExam.setPediatritionID(newUser);
        childExam.setDateOfExam(dateOfExam);
        childExam.setDiagnosis("Something");
        childExam.setConformation(null);
        childExamRepo.save(childExam);
        return ResponseEntity.ok("Request successful");
    }

    @PostMapping("/getScheduledAppointments")
    public List<ChildExaminations> getScheduledAppointments(@RequestBody Map<String, Object> requestMap){
        String token = (String) requestMap.get("token");
        UserLog newUserLog = new UserLog();
        User newUser = new User();
        newUserLog = userLogRepo.findByToken(token);
        newUser = userService.findByEmail(newUserLog.getEmail());
        if(newUser == null)
            throw new IllegalArgumentException("User not found!");
        List<ChildExaminations> list1 = childExamRepo.findAll();
        List<ChildExaminations> list2 = new ArrayList<ChildExaminations>();
        Child ch = new Child();
        User us = new User();
        for (ChildExaminations chE : list1){
            if(chE.getConformation() != null){
                if(chE.getConformation() == true){
                    us = chE.getPediatritionID();
                    us.setPassword(null);
                    chE.setPediatritionID(us);
                    ch = chE.getOibChild();
                    ch.setParent(null);
                    chE.setOibChild(ch);
                    list2.add(chE);
                }
            }
        }
        return list2;
    }
    
    @PostMapping("/getWaitingAppointments")
    public List<ChildExaminations> getWaitingAppointments(@RequestBody Map<String, Object> requestMap){
        String token = (String) requestMap.get("token");
        UserLog newUserLog = new UserLog();
        User newUser = new User();
        newUserLog = userLogRepo.findByToken(token);
        newUser = userService.findByEmail(newUserLog.getEmail());
        if(newUser == null)
            throw new IllegalArgumentException("User not found!");
        List<ChildExaminations> list1 = childExamRepo.findAll();
        List<ChildExaminations> list2 = new ArrayList<ChildExaminations>();
        Child ch = new Child();
        User us = new User();
        for (ChildExaminations chE : list1){
            if(chE.getConformation() == null){
                us = chE.getPediatritionID();
                us.setPassword(null);
                chE.setPediatritionID(us);
                ch = chE.getOibChild();
                ch.setParent(null);
                chE.setOibChild(ch);
                list2.add(chE);
            }
        }
        return list2;
    }

    @PostMapping("/postDeleteAppointment")
    public ResponseEntity<String> postDeleteAppointment(@RequestBody Map<String, Object> requestMap){
        int id = (int) requestMap.get("id");
        ChildExaminations newExam = childExamRepo.findById(id);
        if(newExam == null)
            throw new IllegalArgumentException("Appointment does not exist");
        childExamRepo.delete(newExam);
        return ResponseEntity.ok("Request successful");
    }

    @PostMapping("/postCancelAppointment")
    public ResponseEntity<String> postCancelAppointment(@RequestBody Map<String, Object> requestMap){
        int id = (int) requestMap.get("id");
        String token = (String) requestMap.get("token");
        UserLog newUserLog = new UserLog();
        User newUser = new User();
        newUserLog = userLogRepo.findByToken(token);
        newUser = userService.findByEmail(newUserLog.getEmail());
        if(newUser == null)
            throw new IllegalArgumentException("User not found!");
        ChildExaminations newExam = childExamRepo.findById(id);
        if(newExam == null)
            throw new IllegalArgumentException("Appointment does not exist");
        newExam.setConformation(false);
        childExamRepo.save(newExam);
        return ResponseEntity.ok("Request successful");
    }

    @PostMapping("/postAcceptAppointment")
    public ResponseEntity<String> postAcceptAppointment(@RequestBody Map<String, Object> requestMap){
        int id = (int) requestMap.get("id");
        String token = (String) requestMap.get("token");
        UserLog newUserLog = new UserLog();
        User newUser = new User();
        newUserLog = userLogRepo.findByToken(token);
        newUser = userService.findByEmail(newUserLog.getEmail());
        if(newUser == null)
            throw new IllegalArgumentException("User not found!");
        if(newUser.getRole() != UserRole.LIJECNIK_OBITELJSKE_MEDICINE &&
        newUser.getRole() != UserRole.PEDIJATAR)
            throw new IllegalArgumentException("Not authorized!");
        ChildExaminations newExam = childExamRepo.findById(id);
        if(newExam == null)
            throw new IllegalArgumentException("Appointment does not exist");
        newExam.setConformation(true);
        childExamRepo.save(newExam);
        return ResponseEntity.ok("Request successful");
    }

    @PostMapping("/postNewMedicalExam")
    public ResponseEntity<String> postNewMedicalExam(@RequestBody Map<String, Object> requestMap){
        String oibChild = (String) requestMap.get("childOib");
        String oib = (String) requestMap.get("staffOib");
        String symptomsDescription = (String) requestMap.get("symptomsDescription");
        String symptomsDuration = (String) requestMap.get("symptomsDuration");
        String physicalExamDescription = (String) (requestMap.get("physicalExamDescription"));
        String diagnosisDescription = (String) requestMap.get("diagnosisDescription");
        String diagnosisMedication = (String) requestMap.get("diagnosisMedication");
        String diagnosisTreatment = (String) requestMap.get("diagnosisTreatment");
        String date = (String) requestMap.get("date");
        Boolean isExcuseLetterGiven = (Boolean) requestMap.get("isExcuseLetterGiven");
        String diagnosisName = (String) requestMap.get("diagnosisName");
        String startDate = (String) requestMap.get("startDate");
        String endDate = (String) requestMap.get("endDate");
        Boolean isSickLeaveGiven = (Boolean) (requestMap.get("isSickLeaveGiven"));
        String childDoctorOib = (String) (requestMap.get("childDoctorOib"));
        if(oibChild == null || oib== null || symptomsDescription == null ||
        symptomsDuration == null || diagnosisDescription == null || date == null)
            throw new IllegalArgumentException("Something is missing!");
        Child newChild = new Child();
        newChild = childService.findByOib(oibChild);
        if(newChild == null)
            throw new IllegalArgumentException("Patient not found!");
        User newUser = new User();
        newUser = userService.findByOib(oib);
        if(newUser == null)
            throw new IllegalArgumentException("Pediatrition not found!");
        User doctor = userService.findByOib(childDoctorOib);
        if(doctor == null)
            throw new IllegalArgumentException("Child doctor not found!");
        TestResults tr = new TestResults();
        MedicalCertificates medCert = new MedicalCertificates();
        medCert.setOibChild(newChild);
        medCert.setDateOfCert(startDate);
        medCert.setReason(diagnosisName);
        medCert.setEndDate(endDate);
        medCert.setPedConf(Boolean.toString(isExcuseLetterGiven));
        medCertRepo.save(medCert);
        tr.setDateOfTest(date);
        tr.setPediatritionID(newUser);
        tr.setSymptomsDescription(symptomsDescription);
        tr.setSymptomsDuration(symptomsDuration);
        tr.setPhysicalExamDescription(physicalExamDescription);
        tr.setDiagnosisDescription(diagnosisDescription);
        tr.setDiagnosisMedication(diagnosisMedication);
        tr.setDiagnosisTreatment(diagnosisTreatment);
        tr.setResult(" ");
        tr.setTypeOfResult(" ");
        tr.setOibChild(newChild);
        tr.setMedCert(medCert);
        tr.setSickLeaveLetter(isSickLeaveGiven);
        tr.setPediatritionID(newUser);
        tr.setChildDoctorOib(doctor);
        testResultsRepo.save(tr);
        return ResponseEntity.ok("Request successful");
    }

    @PostMapping("/postNewMedicalReport")
    public ResponseEntity<String> postNewMedicalReport(@RequestBody Map<String, Object> requestMap) {
        String oibChild = (String) requestMap.get("childOib");
        String dateOfNotif = (String) requestMap.get("date");
        String receiverID = (String) (requestMap.get("staffOib"));
        String textOfNotif = (String) (requestMap.get("medicalReport"));
        Boolean feedback = (Boolean) (requestMap.get("feedback"));
        String additionalNote = (String) (requestMap.get("additionalNote"));     
        if(dateOfNotif == null)
            throw new IllegalArgumentException("Date of Medical report is missing!");
        if(textOfNotif == null){
            throw new IllegalArgumentException("Result of report is missing");
        }
        if(oibChild == null || oibChild == "")
            throw new IllegalArgumentException("Child OIB is missing!");
        if(receiverID == null)
            throw new IllegalArgumentException("Doctor OIB is missing!");
        Child newChild = new Child();
        newChild = childService.findByOib(oibChild);
        if(newChild == null)
            throw new IllegalArgumentException("Child not found!");
        User newUser = new User();
        newUser = userService.findByOib(receiverID);
        if(newUser == null)
            throw new IllegalArgumentException("Doctor not found!");
        Notifications notif = new Notifications();
        notif.setChildOib(newChild);
        notif.setDateOfNotif(dateOfNotif);
        notif.setReceiverID(newUser);
        notif.setTextOfNotif(textOfNotif);
        notif.setFeedback(feedback);
        notif.setAdditionalNote(additionalNote);
        notifRepo.save(notif);
        return ResponseEntity.ok("Request successful");
    }
    @PostMapping("/getWaitingMedicalReports")
    public List<Notifications> getWaitingMedicalReports(@RequestBody Map<String, Object> requestMap){
        String token = (String) requestMap.get("token");
        UserLog newUserLog = new UserLog();
        User newUser = new User();
        newUserLog = userLogRepo.findByToken(token);
        newUser = userService.findByEmail(newUserLog.getEmail());
        if(newUser == null)
            throw new IllegalArgumentException("User not found!");
        if(newUser.getRole() != UserRole.LIJECNIK_OBITELJSKE_MEDICINE &&
        newUser.getRole() != UserRole.PEDIJATAR)
            throw new IllegalArgumentException("Not authorized!");
        List<Notifications> list1 = notifRepo.findAll();
        List<Notifications> list2 = new ArrayList<Notifications>();
        Child ch = new Child();
        User us = new User();
        for (Notifications n : list1){
            if(n.getFeedback() == null && n.getAdditionalNote() == null
            && n.getReceiverID().getOib() == newUser.getOib()){
                us = n.getReceiverID();
                us.setPassword(null);
                n.setReceiverID(us);
                ch = n.getChildOib();
                ch.setParent(null);
                n.setChildOib(ch);
                list2.add(n);
            }
        }
        return list2;
    }

    @PostMapping("/postMedicalReportReply")
    public ResponseEntity<String> postMedicalReportReply(@RequestBody Map<String, Object> requestMap){
        int id = (int) requestMap.get("id");
        String additionalNote = (String) requestMap.get("additionalNote");
        if(additionalNote == null)
            throw new IllegalArgumentException("Additional note is missing!");
        Notifications notif = new Notifications();
        notif = notifRepo.findById(id);
        if(notif == null)
            throw new IllegalArgumentException("Cannot find Medical report");
        notif.setFeedback(false);
        notif.setAdditionalNote(additionalNote);
        notifRepo.save(notif);
        return ResponseEntity.ok("Request successful");
    }

    @PostMapping("/postCancelSickLeave")
    public ResponseEntity<String> postCancelSickLeave(@RequestBody Map<String, Object> requestMap){
        int id = (int) requestMap.get("id");
        String token = (String) requestMap.get("token");
        UserLog newUserLog = new UserLog();
        User newUser = new User();
        newUserLog = userLogRepo.findByToken(token);
        newUser = userService.findByEmail(newUserLog.getEmail());
        if(newUser == null)
            throw new IllegalArgumentException("User not found!");
        if(newUser.getRole() != UserRole.LIJECNIK_OBITELJSKE_MEDICINE)
            throw new IllegalArgumentException("Not authorized!");
        TestResults tr = new TestResults();
        tr = testResultsRepo.findById(id);
        if(tr == null)
            throw new IllegalArgumentException("Cannot find Medical exam");
        tr.setSickLeaveLetter(false);
        testResultsRepo.save(tr);
        return ResponseEntity.ok("Request successful");
    }

    @PostMapping("/postAcceptSickLeave")
    public ResponseEntity<String> postAcceptSickLeave(@RequestBody Map<String, Object> requestMap){
        int id = (int) requestMap.get("id");
        String token = (String) requestMap.get("token");
        UserLog newUserLog = new UserLog();
        User newUser = new User();
        newUserLog = userLogRepo.findByToken(token);
        newUser = userService.findByEmail(newUserLog.getEmail());
        if(newUser == null)
            throw new IllegalArgumentException("User not found!");
        if(newUser.getRole() != UserRole.LIJECNIK_OBITELJSKE_MEDICINE)
            throw new IllegalArgumentException("Not authorized!");
        TestResults tr = new TestResults();
        tr = testResultsRepo.findById(id);
        if(tr == null)
            throw new IllegalArgumentException("Cannot find Medical exam");
        tr.setSickLeaveLetter(true);
        testResultsRepo.save(tr);
        return ResponseEntity.ok("Request successful");
    }

    @PostMapping("/getWaitingSickLeaves")
    public List<TestResults> getWaitingSickLeaves(@RequestBody Map<String, Object> requestMap){
        String token = (String) requestMap.get("token");
        UserLog newUserLog = new UserLog();
        User newUser = new User();
        newUserLog = userLogRepo.findByToken(token);
        newUser = userService.findByEmail(newUserLog.getEmail());
        if(newUser == null)
            throw new IllegalArgumentException("User not found!");
        if(newUser.getRole() != UserRole.LIJECNIK_OBITELJSKE_MEDICINE)
            throw new IllegalArgumentException("Not authorized!");
        List<TestResults> list1 = testResultsRepo.findAll();
        List<TestResults> list2 = new ArrayList<TestResults>();
        Child ch = new Child();
        User us = new User();
        for (TestResults tr : list1){
            if(tr.getSickLeaveLetter() == null &&
            tr.getChildDoctorOib() != null && tr.getChildDoctorOib().getOib() == newUser.getOib()){
                us = tr.getChildDoctorOib();
                us.setPassword(null);
                tr.setChildDoctorOib(us);
                us = tr.getPediatritionID();
                us.setPassword(null);
                tr.setPediatritionID(us);
                ch = tr.getOibChild();
                ch.setParent(null);
                tr.setOibChild(ch);
                list2.add(tr);
            }
        }
        return list2;
    }
}
