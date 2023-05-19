package b1.restaurant.restaurant_b1.Payload;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ResProduct {
    private Integer id;
    private String name;
    private double price ;
    private String desciption;
    private UUID photoId;

}
