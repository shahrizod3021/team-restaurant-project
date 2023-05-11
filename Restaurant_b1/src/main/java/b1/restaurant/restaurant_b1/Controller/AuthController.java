package b1.restaurant.restaurant_b1.Controller;

import b1.restaurant.restaurant_b1.Entity.Enums.RoleName;
import b1.restaurant.restaurant_b1.Entity.User;
import b1.restaurant.restaurant_b1.Payload.*;
import b1.restaurant.restaurant_b1.Repository.AuthRepository;
import b1.restaurant.restaurant_b1.Security.JwtTokenProvider;
import b1.restaurant.restaurant_b1.Service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthRepository authRepository;
    private final JwtTokenProvider jwtTokenProvider;

    private final AuthenticationManager authenticationManager;

    private final AuthService authService;


    @PostMapping("/login")
    public HttpEntity<?> login(@RequestBody ReqLogin request) {
            authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getPhoneNumber(), request.getPassword())
        );
        User user = authRepository.findUserByPhoneNumber(request.getPhoneNumber()).get();
        ResToken resToken = new ResToken(generateToken(request.getPhoneNumber()));
        if (user.getRole().getRoleName().equals(RoleName.USER)){
            return ResponseEntity.ok(getmalumot(user, resToken, "/foydalanuvchi"));
        }
        return ResponseEntity.ok(getmalumot(user, resToken, "/auth/admin"));
    }

    @PostMapping("/register")
    public HttpEntity<?> register(@RequestBody ReqRegister register){
        User user = authService.register(register);
        if (user.getRole().getRoleName().equals(RoleName.USER)){
            return ResponseEntity.ok(new ApiResponse("/foydalanuvchi", true));
        }
        return ResponseEntity.ok(new ApiResponse("/auth/admin", true));
    }


    public GetMal getmalumot(User user, ResToken resToken, String path) {
        return new GetMal(user, resToken, path);
    }


    public String generateToken(String phoneNumber) {
        User user = authRepository.findUserByPhoneNumber(phoneNumber).get();
        return jwtTokenProvider.generateToken(user.getId());
    }
}