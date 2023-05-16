package b1.restaurant.restaurant_b1.Service;

import b1.restaurant.restaurant_b1.Entity.Colors;
import b1.restaurant.restaurant_b1.Entity.User;
import b1.restaurant.restaurant_b1.Payload.ApiResponse;
import b1.restaurant.restaurant_b1.Payload.ReqColor;
import b1.restaurant.restaurant_b1.Payload.ResColor;
import b1.restaurant.restaurant_b1.Repository.AuthRepository;
import b1.restaurant.restaurant_b1.Repository.ColorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ColorService {


    private final AuthRepository authRepository;

    public ResColor getColor(UUID uuid){
        User user = authRepository.findById(uuid).get();
        return ResColor.builder()
                .id(user.getColors().getId())
                .bgColor(user.getColors().getBgColor())
                .textColor(user.getColors().getTextColor())
                .build();
    }

    public ApiResponse changeColor(ReqColor reqColor){
        User user = authRepository.findById(reqColor.getId()).get();
        Colors colors = new Colors(reqColor.getBgColor(), reqColor.getTextColor());
        user.getColors().setBgColor(colors.getBgColor());
        user.getColors().setTextColor(colors.getTextColor());
        authRepository.save(user);
        return new ApiResponse("success", true);
    }
}
