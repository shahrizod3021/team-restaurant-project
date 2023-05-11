package b1.restaurant.restaurant_b1.Payload;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ReqRegister {
    private String name;
    private String surname;
    private String phoneNumber;
    private String password;
}
