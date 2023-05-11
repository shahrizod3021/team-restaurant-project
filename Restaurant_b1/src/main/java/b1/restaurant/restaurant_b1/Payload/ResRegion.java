package b1.restaurant.restaurant_b1.Payload;

import b1.restaurant.restaurant_b1.Entity.Country;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ResRegion {
    private Integer id;

    private String name;

    private Country country;
}
