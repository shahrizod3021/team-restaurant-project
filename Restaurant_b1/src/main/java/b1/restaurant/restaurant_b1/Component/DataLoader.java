package b1.restaurant.restaurant_b1.Component;

import b1.restaurant.restaurant_b1.Entity.Colors;
import b1.restaurant.restaurant_b1.Entity.Enums.RoleName;
import b1.restaurant.restaurant_b1.Entity.Restaurant;
import b1.restaurant.restaurant_b1.Entity.Role;
import b1.restaurant.restaurant_b1.Entity.User;
import b1.restaurant.restaurant_b1.Repository.AuthRepository;
import b1.restaurant.restaurant_b1.Repository.ColorRepository;
import b1.restaurant.restaurant_b1.Repository.RestaurantRepository;
import b1.restaurant.restaurant_b1.Repository.RoleRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Collections;

@Component
@Configuration
@RequiredArgsConstructor
public class DataLoader implements CommandLineRunner {

    private final PasswordEncoder passwordEncoder;

    private final AuthRepository authRepository;

    private final RoleRepo roleRepo;

    private final ColorRepository colorRepository;

    private final RestaurantRepository restaurantRepository;

    @Value("${spring.jpa.hibernate.ddl-auto}")
    private String init;


    @Override
    public void run(String... args) throws Exception {
        if (init.equals("create-drop") || init.equals("create")){
            for (RoleName value : RoleName.values()) {
                roleRepo.save(new Role(value));
            }
            restaurantRepository.save(new Restaurant("Restaurant", 0, 0));
            colorRepository.save(Colors.builder().bgColor("rgb(51, 45, 45)").textColor("#fff").build());
            Role role = roleRepo.findById(2).get();
            authRepository.save(
                    new User(
                            "shahrizod",
                            "mirzaaliyev",
                            "980009792",
                            passwordEncoder.encode("0009792"),
                            role,
                            colorRepository.findById(1).get())
            );

        }
    }
}
