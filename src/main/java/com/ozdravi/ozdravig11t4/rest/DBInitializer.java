package com.ozdravi.ozdravig11t4.rest;

import java.util.ArrayList;
import java.util.List;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import com.ozdravi.ozdravig11t4.dao.ChildRegisterRepository;
import com.ozdravi.ozdravig11t4.dao.ChildRepository;
import com.ozdravi.ozdravig11t4.dao.UserLogRepository;
import com.ozdravi.ozdravig11t4.dao.UserRepository;
import com.ozdravi.ozdravig11t4.domain.Child;
import com.ozdravi.ozdravig11t4.domain.ChildRegister;
import com.ozdravi.ozdravig11t4.domain.User;
import com.ozdravi.ozdravig11t4.domain.UserLog;
import com.ozdravi.ozdravig11t4.domain.UserRole;

@Component
public class DBInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final UserLogRepository userLogRepository;
    private final ChildRepository childRepository;
    private final ChildRegisterRepository childRegRepo;

    
    public DBInitializer(UserRepository userRepository, UserLogRepository userLogRepository, ChildRepository childRepository, ChildRegisterRepository childRegRepo) {
        this.userRepository = userRepository;
        this.userLogRepository = userLogRepository;
        this.childRepository = childRepository;
        this.childRegRepo = childRegRepo;
    }

    @Override
    public void run(String... args) throws Exception {

        List<User> allUsers = new ArrayList<>();
        List<UserLog> allUserLog = new ArrayList<>();
        List<Child> allChildren = new ArrayList<>();
        List<ChildRegister> allChildRegister = new ArrayList<>();
        
        User u1 = new User();
        u1.setFirstName("Martina");
        u1.setLastName("Horvat");
        u1.setPassword("randomPassword1");
        u1.setEmail("martina.horvat@gmail.com");
        u1.setRole(UserRole.RODITELJ);
        u1.setAdress("Javorova 12, 10000 Zagreb, Hrvatska");
        u1.setDateOfBirth("15.01.1985.");
        u1.setOib("23456725654");
        u1.setSex("Žensko");
        UserLog ul1 = new UserLog();
        ul1.setEmail(u1.getEmail());
        ul1.setToken(null);
        allUsers.add(u1);
        allUserLog.add(ul1);
        
        User u2 = new User();
        u2.setFirstName("Ivan");
        u2.setLastName("Petrović");
        u2.setPassword("randomPassword2");
        u2.setEmail("ivan.petrovic@yahoo.com");
        u2.setRole(UserRole.RODITELJ);
        u2.setAdress("Hrastova 34, 21000 Split, Hrvatska");
        u2.setDateOfBirth("28.03.1992.");
        u2.setOib("78901212857");
        u2.setSex("Muško");
        UserLog ul2 = new UserLog();
        ul2.setEmail(u2.getEmail());
        ul2.setToken(null);
        allUsers.add(u2);
        allUserLog.add(ul2);

        User u3 = new User();
        u3.setFirstName("Ana");
        u3.setLastName("Jurić");
        u3.setPassword("randomPassword3");
        u3.setEmail("ana.juric@outlook.com");
        u3.setRole(UserRole.RODITELJ);
        u3.setAdress("Lipa 56, 31000 Osijek, Hrvatska");
        u3.setDateOfBirth("07.06.1978.");
        u3.setOib("12345678901");
        u3.setSex("Žensko");
        UserLog ul3 = new UserLog();
        ul3.setEmail(u3.getEmail());
        ul3.setToken(null);
        allUsers.add(u3);
        allUserLog.add(ul3);

        User u4 = new User();
        u4.setFirstName("Marko");
        u4.setLastName("Kovačević");
        u4.setPassword("randomPassword4");
        u4.setEmail("marko.kovacevic@example.com");
        u4.setRole(UserRole.RODITELJ);
        u4.setAdress("Borova 78, 42000 Varaždin, Hrvatska");
        u4.setDateOfBirth("12.09.1989.");
        u4.setOib("23456789012");
        u4.setSex("Muško");
        UserLog ul4 = new UserLog();
        ul4.setEmail(u4.getEmail());
        ul4.setToken(null);
        allUsers.add(u4);
        allUserLog.add(ul4);

        User u5 = new User();
        u5.setFirstName("Petra");
        u5.setLastName("Novak");
        u5.setPassword("randomPassword5");
        u5.setEmail("petra.novak@gmail.com");
        u5.setRole(UserRole.RODITELJ);
        u5.setAdress("Smreča 90, 51000 Rijeka, Hrvatska");
        u5.setDateOfBirth("25.11.1996.");
        u5.setOib("34567890123");
        u5.setSex("Žensko");
        UserLog ul5 = new UserLog();
        ul5.setEmail(u5.getEmail());
        ul5.setToken(null);
        allUsers.add(u5);
        allUserLog.add(ul5);

        User u6 = new User();
        u6.setFirstName("Lana");
        u6.setLastName("Horvat");
        u6.setPassword("randomPassword6");
        u6.setEmail("lana.horvat@gmail.com");
        u6.setRole(UserRole.PEDIJATAR);
        u6.setAdress("Breza 123, 61000 Šibenik, Hrvatska");
        u6.setDateOfBirth("03.04.1981.");
        u6.setOib("45678901234");
        u6.setSex("Žensko");
        UserLog ul6 = new UserLog();
        ul6.setEmail(u6.getEmail());
        ul6.setToken(null);
        allUsers.add(u6);
        allUserLog.add(ul6);

        User u7 = new User();
        u7.setFirstName("Davor");
        u7.setLastName("Kovač");
        u7.setPassword("randomPassword7");
        u7.setEmail("davor.kovac@yahoo.com");
        u7.setRole(UserRole.PEDIJATAR);
        u7.setAdress("Jela 67, 81000 Banja Luka, Bosna i Hercegovina");
        u7.setDateOfBirth("18.07.1975.");
        u7.setOib("56789012345");
        u7.setSex("Muško");
        UserLog ul7 = new UserLog();
        ul7.setEmail(u7.getEmail());
        ul7.setToken(null);
        allUsers.add(u7);
        allUserLog.add(ul7);

        User u8 = new User();
        u8.setFirstName("Jasmina");
        u8.setLastName("Petrović");
        u8.setPassword("randomPassword8");
        u8.setEmail("jasmina.petrovic@outlook.com");
        u8.setRole(UserRole.PEDIJATAR);
        u8.setAdress("Grabova 45, 71000 Sarajevo, Bosna i Hercegovina");
        u8.setDateOfBirth("22.10.1990.");
        u8.setOib("67890123456");
        u8.setSex("Žensko");
        UserLog ul8 = new UserLog();
        ul8.setEmail(u8.getEmail());
        ul8.setToken(null);
        allUsers.add(u8);
        allUserLog.add(ul8);

        User u9 = new User();
        u9.setFirstName("Igor");
        u9.setLastName("Babić");
        u9.setPassword("randomPassword9");
        u9.setEmail("igor.babic@example.com");
        u9.setRole(UserRole.PEDIJATAR);
        u9.setAdress("Topola 89, 91000 Mostar, Bosna i Hercegovina");
        u9.setDateOfBirth("30.05.1987.");
        u9.setOib("78901234567");
        u9.setSex("Muško");
        UserLog ul9 = new UserLog();
        ul9.setEmail(u9.getEmail());
        ul9.setToken(null);
        allUsers.add(u9);
        allUserLog.add(ul9);

        User u10 = new User();
        u10.setFirstName("Maja");
        u10.setLastName("Šimić");
        u10.setPassword("randomPassword10");
        u10.setEmail("maja.simic@gmail.com");
        u10.setRole(UserRole.PEDIJATAR);
        u10.setAdress("Cedrova 234, 11000 Beograd, Srbija");
        u10.setDateOfBirth("09.12.1973.");
        u10.setOib("89012345678");
        u10.setSex("Žensko");
        UserLog ul10 = new UserLog();
        ul10.setEmail(u10.getEmail());
        ul10.setToken(null);
        allUsers.add(u10);
        allUserLog.add(ul10);

        User u11 = new User();
        u11.setFirstName("Marko");
        u11.setLastName("Marković");
        u11.setPassword("adminPassword2");
        u11.setEmail("marko.markovic@example.com");
        u11.setRole(UserRole.ADMIN);
        u11.setAdress("Bukva 56, 12000 Novi Sad, Srbija");
        u11.setDateOfBirth("14.02.1980.");
        u11.setOib("90123456789");
        u11.setSex("Muško");
        UserLog ul11 = new UserLog();
        ul11.setEmail(u11.getEmail());
        ul11.setToken(null);
        allUsers.add(u11);
        allUserLog.add(ul11);

        User u12 = new User();
        u12.setFirstName("Ana");
        u12.setLastName("Anić");
        u12.setPassword("adminPassword3");
        u12.setEmail("ana.anic@example.com");
        u12.setRole(UserRole.ADMIN);
        u12.setAdress("Jasenova 78, 13000 Niš, Srbija");
        u12.setDateOfBirth("23.06.1995.");
        u12.setOib("98765432109");
        u12.setSex("Žensko");
        UserLog ul12 = new UserLog();
        ul12.setEmail(u12.getEmail());
        ul12.setToken(null);
        allUsers.add(u12);
        allUserLog.add(ul12);

        User u13 = new User();
        u13.setFirstName("Mate");
        u13.setLastName("Matić");
        u13.setPassword("adminPassword4");
        u13.setEmail("mate.matic@example.com");
        u13.setRole(UserRole.RODITELJ);
        u13.setAdress("Divlja Trešnja 101, 14000 Kragujevac, Srbija");
        u13.setDateOfBirth("05.09.1971.");
        u13.setOib("87654321098");
        u13.setSex("Muško");
        UserLog ul13 = new UserLog();
        ul13.setEmail(u13.getEmail());
        ul13.setToken(null);
        allUsers.add(u13);
        allUserLog.add(ul13);

        User u14 = new User();
        u14.setFirstName("Elena");
        u14.setLastName("Elenić");
        u14.setPassword("adminPassword5");
        u14.setEmail("elena.elenic@example.com");
        u14.setRole(UserRole.LIJECNIK_OBITELJSKE_MEDICINE);
        u14.setAdress("Kestenova 345, 15000 Čačak, Srbija");
        u14.setDateOfBirth("17.11.1983.");
        u14.setOib("76543210987");
        u14.setSex("Žensko");
        UserLog ul14 = new UserLog();
        ul14.setEmail(u14.getEmail());
        ul14.setToken(null);
        allUsers.add(u14);
        allUserLog.add(ul14);

        User u15 = new User();
        u15.setFirstName("Luka");
        u15.setLastName("Lukić");
        u15.setPassword("adminPassword6");
        u15.setEmail("luka.lukic@example.com");
        u15.setRole(UserRole.PEDIJATAR);
        u15.setAdress("Smokva 67, 16000 Leskovac, Srbija");
        u15.setDateOfBirth("21.03.1974.");
        u15.setOib("65432109876");
        u15.setSex("Muško");
        UserLog ul15 = new UserLog();
        ul15.setEmail(u15.getEmail());
        ul15.setToken(null);
        allUsers.add(u15);
        allUserLog.add(ul15);

        User u16 = new User();
        u16.setFirstName("Petar");
        u16.setLastName("Petrović");
        u16.setPassword("docPassword1");
        u16.setEmail("petar.petrovic@example.com");
        u16.setRole(UserRole.LIJECNIK_OBITELJSKE_MEDICINE);
        u16.setAdress("Orahova 89, 17000 Subotica, Srbija");
        u16.setDateOfBirth("08.07.1998.");
        u16.setOib("54321098765");
        u16.setSex("Muško");
        UserLog ul16 = new UserLog();
        ul16.setEmail(u16.getEmail());
        ul16.setToken(null);
        allUsers.add(u16);
        allUserLog.add(ul16);

        User u17 = new User();
        u17.setFirstName("Lara");
        u17.setLastName("Laraš");
        u17.setPassword("docPassword2");
        u17.setEmail("lara.laras@example.com");
        u17.setRole(UserRole.LIJECNIK_OBITELJSKE_MEDICINE);
        u17.setAdress("Višnja 123, 18000 Zrenjanin, Srbija");
        u17.setDateOfBirth("02.04.1976.");
        u17.setOib("43210987654");
        u17.setSex("Žensko");
        UserLog ul17 = new UserLog();
        ul17.setEmail(u17.getEmail());
        ul17.setToken(null);
        allUsers.add(u17);
        allUserLog.add(ul17);

        User u18 = new User();
        u18.setFirstName("Ivan");
        u18.setLastName("Ivančić");
        u18.setPassword("docPassword3");
        u18.setEmail("ivan.ivancic@example.com");
        u18.setRole(UserRole.LIJECNIK_OBITELJSKE_MEDICINE);
        u18.setAdress("Ljiljana 45, 19000 Pančevo, Srbija");
        u18.setDateOfBirth("19.08.1991.");
        u18.setOib("32109876543");
        u18.setSex("Muško");
        UserLog ul18 = new UserLog();
        ul18.setEmail(u18.getEmail());
        ul18.setToken(null);
        allUsers.add(u18);
        allUserLog.add(ul18);

        User u19 = new User();
        u19.setFirstName("Maja");
        u19.setLastName("Majić");
        u19.setPassword("docPassword4");
        u19.setEmail("maja.majic@example.com");
        u19.setRole(UserRole.LIJECNIK_OBITELJSKE_MEDICINE);
        u19.setAdress("Bagremova 67, 20000 Sombor, Srbija");
        u19.setDateOfBirth("10.01.1979.");
        u19.setOib("21098765432");
        u19.setSex("Žensko");
        UserLog ul19 = new UserLog();
        ul19.setEmail(u19.getEmail());
        ul19.setToken(null);
        allUsers.add(u19);
        allUserLog.add(ul19);

        User u20 = new User();
        u20.setFirstName("Nikola");
        u20.setLastName("Nikolić");
        u20.setPassword("docPassword5");
        u20.setEmail("nikola.nikolic@example.com");
        u20.setRole(UserRole.LIJECNIK_OBITELJSKE_MEDICINE);
        u20.setAdress("Trešnjin Trg 89, 21000 Novi Pazar, Srbija");
        u20.setDateOfBirth("26.12.1984.");
        u20.setOib("10987654321");
        u20.setSex("Muško");
        UserLog ul20 = new UserLog();
        ul20.setEmail(u20.getEmail());
        ul20.setToken(null);
        allUsers.add(u20);
        allUserLog.add(ul20);

        Child c1 = new Child();
        c1.setFirstName("Luka");
        c1.setName("Luka");
        c1.setLastName(u1.getLastName());
        c1.setBirthDate("05.03.2010");
        c1.setOib("48372651908");
        c1.setSex("Muško");
        c1.setParent(u1);
        allChildren.add(c1);
        ChildRegister cr1 = new ChildRegister();
        cr1.setChildID(c1);
        cr1.setDoctorID(u20);
        cr1.setPediatritionID(u15);
        allChildRegister.add(cr1);

        Child c2 = new Child();
        c2.setFirstName("Ana");
        c2.setName("Ana");
        c2.setLastName(u1.getLastName());
        c2.setBirthDate("12.08.2012");
        c2.setOib("90541763282");
        c2.setSex("Žensko");
        c2.setParent(u1);
        allChildren.add(c2);
        ChildRegister cr2 = new ChildRegister();
        cr2.setChildID(c2);
        cr2.setDoctorID(u19);
        cr2.setPediatritionID(u15);
        allChildRegister.add(cr2);

        Child c3 = new Child();
        c3.setFirstName("Marko");
        c3.setName("Marko");
        c3.setLastName(u1.getLastName());
        c3.setBirthDate("20.05.2015");
        c3.setOib("76129453801");
        c3.setSex("Muško");
        c3.setParent(u1);
        allChildren.add(c3);
        ChildRegister cr3 = new ChildRegister();
        cr3.setChildID(c3);
        cr3.setDoctorID(u20);
        cr3.setPediatritionID(u10);
        allChildRegister.add(cr3);

        Child c4 = new Child();
        c4.setFirstName("Elena");
        c4.setName("Elena");
        c4.setLastName(u2.getLastName());
        c4.setBirthDate("02.11.2017");
        c4.setOib("24938716570");
        c4.setSex("Žensko");
        c4.setParent(u2);
        allChildren.add(c4);
        ChildRegister cr4 = new ChildRegister();
        cr4.setChildID(c4);
        cr4.setDoctorID(u18);
        cr4.setPediatritionID(u9);
        allChildRegister.add(cr4);

        Child c5 = new Child();
        c5.setFirstName("Ivan");
        c5.setName("Ivan");
        c5.setLastName(u2.getLastName());
        c5.setBirthDate("18.04.2019");
        c5.setOib("83756120494");
        c5.setSex("Muško");
        c5.setParent(u2);
        allChildren.add(c5);
        ChildRegister cr5 = new ChildRegister();
        cr5.setChildID(c5);
        cr5.setDoctorID(u19);
        cr5.setPediatritionID(u10);
        allChildRegister.add(cr5);

        Child c6 = new Child();
        c6.setFirstName("Petra");
        c6.setName("Petra");
        c6.setLastName(u3.getLastName());
        c6.setBirthDate("14.12.2010");
        c6.setOib("67034829175");
        c6.setSex("Žensko");
        c6.setParent(u3);
        allChildren.add(c6);
        ChildRegister cr6 = new ChildRegister();
        cr6.setChildID(c6);
        cr6.setDoctorID(u14);
        cr6.setPediatritionID(u15);
        allChildRegister.add(cr6);

        Child c7 = new Child();
        c7.setFirstName("Luka");
        c7.setName("Luka");
        c7.setLastName(u3.getLastName());
        c7.setBirthDate("30.08.2012");
        c7.setOib("51283097645");
        c7.setSex("Muško");
        c7.setParent(u3);
        allChildren.add(c7);
        ChildRegister cr7 = new ChildRegister();
        cr7.setChildID(c7);
        cr7.setDoctorID(u14);
        cr7.setPediatritionID(u6);
        allChildRegister.add(cr7);

        Child c8 = new Child();
        c8.setFirstName("Maja");
        c8.setName("Maja");
        c8.setLastName(u3.getLastName());
        c8.setBirthDate("25.03.2015");
        c8.setOib("19384567205");
        c8.setSex("Žensko");
        c8.setParent(u3);
        allChildren.add(c8);
        ChildRegister cr8 = new ChildRegister();
        cr8.setChildID(c8);
        cr8.setDoctorID(u16);
        cr8.setPediatritionID(u6);
        allChildRegister.add(cr8);

        Child c9 = new Child();
        c9.setFirstName("Igor");
        c9.setName("Igor");
        c9.setLastName(u3.getLastName());
        c9.setBirthDate("10.09.2017");
        c9.setOib("80467251329");
        c9.setSex("Muško");
        c9.setParent(u3);
        allChildren.add(c9);
        ChildRegister cr9 = new ChildRegister();
        cr9.setChildID(c9);
        cr9.setDoctorID(u17);
        cr9.setPediatritionID(u15);
        allChildRegister.add(cr9);

        Child c10 = new Child();
        c10.setFirstName("Lara");
        c10.setName("Lara");
        c10.setLastName(u4.getLastName());
        c10.setBirthDate("07.02.2019");
        c10.setOib("35689247018");
        c10.setSex("Žensko");
        c10.setParent(u4);
        allChildren.add(c10);
        ChildRegister cr10 = new ChildRegister();
        cr10.setChildID(c10);
        cr10.setDoctorID(u19);
        cr10.setPediatritionID(u7);
        allChildRegister.add(cr10);

        Child c11 = new Child();
        c11.setFirstName("Mia");
        c11.setName("Mia");
        c11.setLastName(u4.getLastName());
        c11.setBirthDate("15.06.2014");
        c11.setOib("91827450386");
        c11.setSex("Žensko");
        c11.setParent(u4);
        allChildren.add(c11);
        ChildRegister cr11 = new ChildRegister();
        cr11.setChildID(c11);
        cr11.setDoctorID(u16);
        cr11.setPediatritionID(u8);
        allChildRegister.add(cr11);

        Child c12 = new Child();
        c12.setFirstName("Mateo");
        c12.setName("Mateo");
        c12.setLastName(u5.getLastName());
        c12.setBirthDate("28.11.2018");
        c12.setOib("46509827314");
        c12.setSex("Muško");
        c12.setParent(u5);
        allChildren.add(c12);
        ChildRegister cr12 = new ChildRegister();
        cr12.setChildID(c12);
        cr12.setDoctorID(u17);
        cr12.setPediatritionID(u9);
        allChildRegister.add(cr12);

        Child c13 = new Child();
        c13.setFirstName("Eva");
        c13.setName("Eva");
        c13.setLastName(u13.getLastName());
        c13.setBirthDate("03.09.2013");
        c13.setOib("72813460591");
        c13.setSex("Žensko");
        c13.setParent(u13);
        allChildren.add(c13);
        ChildRegister cr13 = new ChildRegister();
        cr13.setChildID(c13);
        cr13.setDoctorID(u20);
        cr13.setPediatritionID(u8);
        allChildRegister.add(cr13);

        Child c14 = new Child();
        c14.setFirstName("Luka");
        c14.setName("Luka");
        c14.setLastName(u13.getLastName());
        c14.setBirthDate("12.12.2017");
        c14.setOib("59284710368");
        c14.setSex("Muško");
        c14.setParent(u13);
        allChildren.add(c14);
        ChildRegister cr14 = new ChildRegister();
        cr14.setChildID(c14);
        cr14.setDoctorID(u18);
        cr14.setPediatritionID(u9);
        allChildRegister.add(cr14);

        Child c15 = new Child();
        c15.setFirstName("Mila");
        c15.setName("Mila");
        c15.setLastName(u13.getLastName());
        c15.setBirthDate("19.05.2016");
        c15.setOib("30198746524");
        c15.setSex("Žensko");
        c15.setParent(u13);
        allChildren.add(c15);
        ChildRegister cr15 = new ChildRegister();
        cr15.setChildID(c15);
        cr15.setDoctorID(u17);
        cr15.setPediatritionID(u8);
        allChildRegister.add(cr15);


        List<User> users = userRepository.findAll();
        List<UserLog> userLogs = userLogRepository.findAll();
        List<String> emails = new ArrayList<>();
        List<String> logEmails = new ArrayList<>();
        for (User u : users) {
            emails.add(u.getEmail());
        }
        for (UserLog ul : userLogs) {
            logEmails.add(ul.getEmail());
        } 

        for (User us : allUsers){
            if(!emails.contains(us.getEmail()))
                userRepository.save(us);
        }
        for (UserLog uls : allUserLog){
            if(!logEmails.contains(uls.getEmail()))
                userLogRepository.save(uls);
        }
        List<Child> children = childRepository.findAll();
        List<String> oibs = new ArrayList<>();
        for (Child c : children){
            oibs.add(c.getOib());
        }
        for (Child ch : allChildren) {
            if (!oibs.contains(ch.getOib())){
                childRepository.save(ch);
            }
        }

        List<ChildRegister> childReg = childRegRepo.findAll();
        List<String> chOibs = new ArrayList<>();
        for (ChildRegister cr : childReg){
            chOibs.add(cr.getChildID().getOib());
        }
        for (ChildRegister chR : allChildRegister) {
            if (!chOibs.contains(chR.getChildID().getOib())) {
                childRegRepo.save(chR);
            }
        }
    }
    
}
