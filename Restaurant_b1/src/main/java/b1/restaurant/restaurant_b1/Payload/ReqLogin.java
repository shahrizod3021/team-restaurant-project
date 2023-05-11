package b1.restaurant.restaurant_b1.Payload;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ReqLogin {
    private String phoneNumber;
    private String password;
}
