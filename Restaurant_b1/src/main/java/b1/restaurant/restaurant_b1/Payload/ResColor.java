package b1.restaurant.restaurant_b1.Payload;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ResColor {

    private Integer id;

    private String bgColor;

    private String textColor;
}
