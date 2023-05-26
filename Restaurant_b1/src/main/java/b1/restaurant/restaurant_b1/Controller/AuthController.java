package b1.restaurant.restaurant_b1.Controller;

import b1.restaurant.restaurant_b1.Entity.Colors;
import b1.restaurant.restaurant_b1.Entity.Enums.RoleName;
import b1.restaurant.restaurant_b1.Entity.User;
import b1.restaurant.restaurant_b1.Payload.*;
import b1.restaurant.restaurant_b1.Repository.AuthRepository;
import b1.restaurant.restaurant_b1.Repository.ColorRepository;
import b1.restaurant.restaurant_b1.Security.JwtTokenProvider;
import b1.restaurant.restaurant_b1.Service.AuthService;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.UUID;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@CrossOrigin
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
        if (user.getRole().getRoleName().equals(RoleName.USER)) {
            return ResponseEntity.ok(getmalumot(user, resToken, "/auth/user"));
        }
        return ResponseEntity.ok(getmalumot(user, resToken, "/auth/admin"));
    }

    @PostMapping("/register")
    public HttpEntity<?> register(@RequestBody ReqRegister register) {
        User user = authService.register(register);
        if (user.getRole().getRoleName().equals(RoleName.USER)) {
            return ResponseEntity.ok(new GetMal(user, null, "/upload/photo"));
        }
        return ResponseEntity.ok(new ApiResponse("/auth/admin", true));
    }

    @GetMapping("/{id}")
    public HttpEntity<?> getOneUser(@PathVariable UUID id) {
        ResUser oneUser = authService.getOneUser(id);
        return ResponseEntity.ok(oneUser);
    }

    @PutMapping("/upload/{id}")
    public HttpEntity<?> uploadPhotojon(@PathVariable UUID id, @RequestParam(name = "photoId") UUID photoId) {
        User user = authRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("getUser"));
        user.setPhotoId(photoId);
        authRepository.save(user);
        return ResponseEntity.ok(new ApiResponse("taxrirlandi", true));
    }


    @PutMapping("/{id}")
    public HttpEntity<?> editUser(@PathVariable UUID id, @RequestBody ReqRegister register) {
        ApiResponse apiResponse = authService.editUser(id, register);
        return ResponseEntity.status(apiResponse.isSuccess() ? 200 : 409).body(apiResponse);
    }


    public GetMal getmalumot(User user, ResToken resToken, String path) {
        return new GetMal(user, resToken, path);
    }


    public String generateToken(String phoneNumber) {
        User user = authRepository.findUserByPhoneNumber(phoneNumber).get();
        return jwtTokenProvider.generateToken(user.getId());
    }
}
