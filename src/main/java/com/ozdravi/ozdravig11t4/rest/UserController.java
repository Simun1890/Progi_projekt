package com.ozdravi.ozdravig11t4.rest;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ozdravi.ozdravig11t4.dao.ChildRepository;
import com.ozdravi.ozdravig11t4.dao.UserLogRepository;
import com.ozdravi.ozdravig11t4.dao.UserRepository;
import com.ozdravi.ozdravig11t4.domain.Child;
import com.ozdravi.ozdravig11t4.domain.User;
import com.ozdravi.ozdravig11t4.domain.UserLog;
import com.ozdravi.ozdravig11t4.domain.UserRole;
import com.ozdravi.ozdravig11t4.service.ChildService;
import com.ozdravi.ozdravig11t4.service.UserService;


@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private UserService userService;

    @Autowired
    private UserLogRepository userLogRepo;

    @Autowired
    private ChildService childService;

    @Autowired
    private ChildRepository childRepo;

    @GetMapping("")
    public List<User> listUsers(){
        return userService.listAll();
    }

    @PostMapping("")
    public User createUSer(@RequestBody User user){
        return userService.createUser(user);
    }
    
    @PostMapping("/register")
    public String registerUser(@RequestBody User user){
        if(user.getOib() == null || user.getEmail() == null || user.getPassword() == null)
            throw new IllegalArgumentException("Invalid data sent!");
        User newUser = userService.findByEmail(user.getEmail());
        if(newUser != null){
            throw new IllegalArgumentException("Email alredy taken");
        }
        newUser = userService.findByOib(user.getOib());
        if(newUser != null){
            throw new IllegalArgumentException("User with the same OIB alredy exist");
        }
        UserLog userlog = new UserLog();
        userlog.setEmail(user.getEmail());
        String randomStr = UUID.randomUUID().toString();
        userlog.setToken(randomStr);
        if(user.getRole()==null)
            user.setRole(UserRole.RODITELJ);
        userLogRepo.save(userlog);
        userService.createUser(user);
        return userlog.getToken();
    }

    @PostMapping("/login")
    public String loginUser(@RequestBody User user){
        if(user.getPassword()==null || user.getEmail() == null)
            throw new IllegalArgumentException("Something is missing!");
        User newUser = userService.findByEmail(user.getEmail());
        if(newUser == null){
            throw new IllegalArgumentException("Email does not exist!");
        }
        if(newUser.getPassword().trim().equals(user.getPassword().trim())){
            UserLog userlog = userLogRepo.findByEmail(user.getEmail());
            String randomStr = UUID.randomUUID().toString();
            userlog.setToken(randomStr);
            userLogRepo.save(userlog);
            return userlog.getToken();
        }
        else{
            throw new IllegalArgumentException("Wrong password!");
        }
    }
    @PostMapping("/getProfile")
    public User getProfile(@RequestBody UserLog token){
        if(token.getToken() == null)
            throw new IllegalArgumentException("Invalid token given");
        UserLog userlog = userLogRepo.findByToken(token.getToken());
        if(userlog == null)
            throw new IllegalArgumentException("Token does not exist!");
        User newUser = userService.findByEmail(userlog.getEmail());
        newUser.setPassword(null);
        return newUser;
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logout(@RequestBody UserLog token){
        if(token.getToken() == null)
            throw new IllegalArgumentException("Invalid token given");
        UserLog userlog = userLogRepo.findByToken(token.getToken());
        if(userlog == null)
            throw new IllegalArgumentException("Token does not exist!");
        userlog.setToken(null);
        userLogRepo.save(userlog);
        return ResponseEntity.ok("Request successful");
    }

    @PostMapping("/getUserProfileByOib")
    public User getUserProfileByOib(@RequestBody Map<String, Object> requestMap) {
        String token = (String) requestMap.get("token");
        String oib = (String) requestMap.get("oib");
        if(token == null)
            throw new IllegalArgumentException("Invalid token given");
        UserLog userlog = userLogRepo.findByToken(token);
        User u = new User();
        u = userService.findByEmail(userlog.getEmail());
        if(userlog == null || u == null)
            throw new IllegalArgumentException("Token does not exist!");
        if(u.getRole() != UserRole.ADMIN)
            throw new IllegalArgumentException("Not authorized!");
        u = userService.findByOib(oib);
        if(u == null)
            throw new IllegalArgumentException("User does not exist!");
        u.setPassword(null);
        return u;
    }

    @PostMapping("/editUserProfileByOib")
    public ResponseEntity<String> editUserProfileByOib(@RequestBody Map<String, Object> requestMap) {
        String token = (String) requestMap.get("token");
        String name = (String) requestMap.get("name");
        String surname = (String) requestMap.get("surname");
        String oib = (String) requestMap.get("oib");
        String sex = (String) requestMap.get("sex");
        String dateOfBirth = (String) requestMap.get("dateOfBirth");
        String email = (String) requestMap.get("email");
        String adress = (String) requestMap.get("adress");
        String role = (String) requestMap.get("role");
        if(name == null || surname == null || oib == null || sex == null ||
        dateOfBirth == null || email == null || adress == null || role == null)
            throw new IllegalArgumentException("Something is missing");
        if(token == null)
            throw new IllegalArgumentException("Invalid token given");
        UserLog userlog = userLogRepo.findByToken(token);
        User u = new User();
        u = userService.findByEmail(userlog.getEmail());
        if(userlog == null || u == null)
            throw new IllegalArgumentException("Token does not exist!");
        if(u.getRole() != UserRole.ADMIN)
            throw new IllegalArgumentException("Not authorized!");
        u = userService.findByOib(oib);
        u.setAdress(adress);
        u.setDateOfBirth(dateOfBirth);
        u.setEmail(email);
        u.setFirstName(name);
        u.setLastName(surname);
        u.setOib(oib);
        u.setSex(sex);
        if(role.toLowerCase().trim().equals("admin"))
            u.setRole(UserRole.ADMIN);
        if(role.toLowerCase().trim().equals("lijecnik_obiteljske_medicine"))
            u.setRole(UserRole.LIJECNIK_OBITELJSKE_MEDICINE);
        if(role.toLowerCase().trim().equals("pedijatar"))
            u.setRole(UserRole.PEDIJATAR);
        if(role.toLowerCase().trim().equals("roditelj"))
            u.setRole(UserRole.RODITELJ);
        userRepo.save(u);
        return ResponseEntity.ok("Request successful");
    }
    @PostMapping("/deleteUserProfileByOib")
    public ResponseEntity<String> deleteUserProfileByOib(@RequestBody Map<String, Object> requestMap) {
        String token = (String) requestMap.get("token");
        String oib = (String) requestMap.get("oib");
        if(token == null)
            throw new IllegalArgumentException("Invalid token given");
        UserLog userlog = userLogRepo.findByToken(token);
        User u = new User();
        User us = new User();
        u = userService.findByEmail(userlog.getEmail());
        if(userlog == null || u == null)
            throw new IllegalArgumentException("Token does not exist!");
        if(u.getRole() != UserRole.ADMIN)
            throw new IllegalArgumentException("Not authorized!");
        u = userService.findByOib(oib);
        List<Child> list = new ArrayList<>();
        list = childService.findByParent(u);
        for(Child c: list){
            us.setOib(c.getOib());
            c.setParent(us);
            userRepo.save(us);
            childRepo.save(c);
        }
        userRepo.delete(u);
        return ResponseEntity.ok("Request successful");
    }

}
