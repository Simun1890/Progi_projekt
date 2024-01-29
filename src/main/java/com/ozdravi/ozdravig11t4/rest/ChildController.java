package com.ozdravi.ozdravig11t4.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.ozdravi.ozdravig11t4.dao.ChildRegisterRepository;
import com.ozdravi.ozdravig11t4.dao.NotificationsRepository;
import com.ozdravi.ozdravig11t4.dao.TestResultsRepository;
import com.ozdravi.ozdravig11t4.dao.UserLogRepository;
import com.ozdravi.ozdravig11t4.domain.Child;
import com.ozdravi.ozdravig11t4.domain.ChildRegister;
import com.ozdravi.ozdravig11t4.domain.Notifications;
import com.ozdravi.ozdravig11t4.domain.TestResults;
import com.ozdravi.ozdravig11t4.domain.User;
import com.ozdravi.ozdravig11t4.domain.UserLog;
import com.ozdravi.ozdravig11t4.domain.UserRole;
import com.ozdravi.ozdravig11t4.service.ChildService;
import com.ozdravi.ozdravig11t4.service.UserService;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/children")
public class ChildController {

    @Autowired
    private ChildService childService;

    @Autowired
    private UserService userService;

    @Autowired
    private UserLogRepository userLogRepo;

    @Autowired
    private ChildRegisterRepository childRegRepo;

    @Autowired
    private TestResultsRepository testResultsRepo;

    @Autowired
    private NotificationsRepository notifRepo;

    @GetMapping("")
    public List<Child> listChildren() {
        return childService.listAll();
    }

    @PostMapping("/getChildProfile")
    public List<Child> getChildProfile(@RequestBody UserLog userlog){
        User newUser = new User();
        UserLog userlog2 = new UserLog();
        userlog2 = userLogRepo.findByToken(userlog.getToken());
        newUser = userService.findByEmail(userlog2.getEmail());
        if(newUser == null)
            throw new IllegalArgumentException("User not found!");
        List <Child> children1 = new ArrayList<>();
        List <Child> children2 = new ArrayList<>();
        children1 = childService.findByParent(newUser);
        for(Child c : children1){
            c.setParent(null);
            children2.add(c);
        }
        return children2;
    }

    @PostMapping("/getMedicalStaff")
    public List<ChildRegister> getMedicalStaff(@RequestBody UserLog userlog){
        UserLog userlog2 = new UserLog();
        userlog2 = userLogRepo.findByToken(userlog.getToken());
        User newUser = new User();
        newUser = userService.findByEmail(userlog2.getEmail());
        List<Child> newChild = new ArrayList<>();
        newChild = childService.findByParent(newUser);
        List<ChildRegister> registers = new ArrayList<>();
        ChildRegister newRegister = new ChildRegister();
        for (Child c : newChild) {
            newRegister = childRegRepo.findByChildID(c);
            c.setParent(null);
            newRegister.setChildID(c);
            newUser = newRegister.getDoctorID();
            newUser.setPassword(null);
            newRegister.setDoctorID(newUser);
            newUser = newRegister.getPediatritionID();
            newUser.setPassword(null);
            newRegister.setPediatritionID(newUser);
            registers.add(newRegister);
        }
        return registers;
    }

    @PostMapping("/getPatients")
    public List<Child> getPatients(@RequestBody UserLog userlog){
        UserLog userlog2 = new UserLog();
        userlog2 = userLogRepo.findByToken(userlog.getToken());
        User newUser = new User();
        newUser = userService.findByEmail(userlog2.getEmail());
        if(newUser == null)
            throw new IllegalArgumentException("User not found!");
        if(newUser.getRole() != UserRole.LIJECNIK_OBITELJSKE_MEDICINE &&
        newUser.getRole() != UserRole.PEDIJATAR)
            throw new IllegalArgumentException("Not authorized!");
        List<ChildRegister> registers = new ArrayList<>();
        if(newUser.getRole() == UserRole.LIJECNIK_OBITELJSKE_MEDICINE){
            registers = childRegRepo.findByDoctorID(newUser);
        }else{
            registers = childRegRepo.findByPediatritionID(newUser);
        }
        List<Child> children = new ArrayList<>();
        Child child = new Child();
        for(ChildRegister cr: registers){
            child = cr.getChildID();
            child.setParent(null);
            children.add(child);
        }
        return children;
    }

    @PostMapping("/getChildProfileByOib")
    public Child getChildProfileByOib(@RequestBody Child childOib){
        if(childOib == null)
            throw new IllegalArgumentException("Invalid OIB given");
        Child child = childService.findByOib(childOib.getOib());
        if(child == null)
            throw new IllegalArgumentException("Child does not exist!");
        child.setId(0);
        child.setParent(null);
        return child;
    }

    @PostMapping("/getDoctorProfileByChildOib")
    public User getDoctorProfileByChildOib(@RequestBody Map<String, Object> requestMap) {
        String childOib = (String) (requestMap.get("childOib"));
        if(childOib == null)
            throw new IllegalArgumentException("Invalid OIB given");
        Child child = childService.findByOib(childOib);
        if(child == null)
            throw new IllegalArgumentException("Child does not exist!");
        User u = new User();
        ChildRegister cr = new ChildRegister();
        cr = childRegRepo.findByChildID(child);
        u = cr.getDoctorID();
        u.setPassword(null);
        return u;
    }

    @PostMapping("/getPediatricianProfileByChildOib")
    public User getDoctorPediatricianByChildOib(@RequestBody Map<String, Object> requestMap) {
        String childOib = (String) (requestMap.get("childOib"));
        if(childOib == null)
            throw new IllegalArgumentException("Invalid OIB given");
        Child child = childService.findByOib(childOib);
        if(child == null)
            throw new IllegalArgumentException("Child does not exist!");
        User u = new User();
        ChildRegister cr = new ChildRegister();
        cr = childRegRepo.findByChildID(child);
        u = cr.getPediatritionID();
        u.setPassword(null);
        return u;
    }

    @PostMapping("/getMedicalExamsByChildOib")
    public List<TestResults> getMedicalExamsByChildOib(@RequestBody Map<String, Object> requestMap) {
        String childOib = (String) (requestMap.get("childOib"));
        if(childOib == null)
            throw new IllegalArgumentException("Invalid OIB given");
        Child child = childService.findByOib(childOib);
        if(child == null)
            throw new IllegalArgumentException("Child does not exist!");
        User u = new User();
        List<TestResults> tr = new ArrayList<>();
        tr = testResultsRepo.findByOibChild(child);
        for (TestResults t:tr){
            u = t.getChildDoctorOib();
            u.setPassword(null);
            t.setChildDoctorOib(u);
            u = t.getPediatritionID();
            u.setPassword(null);
            t.setPediatritionID(u);
        }
        return tr;
    }

    @PostMapping("/getMedicalReportsByChildOib")
    public List<Notifications> getMedicalreportsByChildOib(@RequestBody Map<String, Object> requestMap) {
        String childOib = (String) (requestMap.get("childOib"));
        if(childOib == null)
            throw new IllegalArgumentException("Invalid OIB given");
        Child child = childService.findByOib(childOib);
        if(child == null)
            throw new IllegalArgumentException("Child does not exist!");
        List<Notifications> notif = new ArrayList<>();
        notif = notifRepo.findByChildOIB(child);
        for (Notifications n:notif){
            n.setChildOib(null);
            n.setReceiverID(null);
        }
        return notif;
    }


    @PostMapping("/getChild")
    public List<Child> getProfile(){
        return childService.listAll();
    }
}
