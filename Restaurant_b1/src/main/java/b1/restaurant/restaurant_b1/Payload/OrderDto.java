package b1.restaurant.restaurant_b1.Payload;

import b1.restaurant.restaurant_b1.Entity.Aksiya;
import b1.restaurant.restaurant_b1.Entity.Product;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class OrderDto {
    private String name;
    private double allPrice;
    private boolean delivered;
    private Product product;
    private Integer yil;
    private Integer oy;
    private Integer kun;
    private Aksiya aksiya;
}
