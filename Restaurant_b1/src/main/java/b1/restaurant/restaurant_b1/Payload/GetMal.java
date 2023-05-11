package b1.restaurant.restaurant_b1.Payload;

import b1.restaurant.restaurant_b1.Entity.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class GetMal {
    private User user;
    private ResToken resToken;
    private String path;
}
