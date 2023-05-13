package b1.restaurant.restaurant_b1.Service;

import b1.restaurant.restaurant_b1.Entity.Enums.RoleName;
import b1.restaurant.restaurant_b1.Entity.User;
import b1.restaurant.restaurant_b1.Payload.*;
import b1.restaurant.restaurant_b1.Repository.AuthRepository;
import b1.restaurant.restaurant_b1.Repository.RoleRepo;
import b1.restaurant.restaurant_b1.Security.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.RequestResponseBodyMethodProcessor;

import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AuthService implements UserDetailsService {

    private final AuthRepository authRepository;

    private final RoleRepo roleRepo;


    @Autowired
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    public UserDetails getUserById(UUID id) {
        return authRepository.findById(id).get();
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return authRepository.findUserByPhoneNumber(username).get();
    }

    public User register(ReqRegister register) {
        return authRepository.save(
                new User(
                        register.getName(),
                        register.getSurname(),
                        register.getPhoneNumber(),
                        passwordEncoder().encode(register.getPassword()),
                        roleRepo.findById(1).get())
        );
    }

    public ResUser getOneUser(UUID uuid){
        Optional<User> byId = authRepository.findById(uuid);
        if (byId.isPresent()){
            User user = byId.get();
            return  ResUser.builder()
                    .id(user.getId())
                    .name(user.getName())
                    .surname(user.getLastName())
                    .phoneNumber(user.getPhoneNumber())
                    .password(user.getPassword())
                    .zakazList(user.getZakazList())
                    .build();
        }
        return null;
    }

}
