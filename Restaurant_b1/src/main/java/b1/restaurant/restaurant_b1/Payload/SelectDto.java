package b1.restaurant.restaurant_b1.Payload;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.annotation.Nonnull;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class SelectDto {
    private String label;
    private Integer value;
}
