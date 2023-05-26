package b1.restaurant.restaurant_b1.Payload;

import b1.restaurant.restaurant_b1.Entity.Product;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ResSale {
    private String name;
    private double foyiz;
    private double allPrice;
    private Integer id;
    private double pastPrice;
    private UUID photoId;
    private List<Product> products;
    private boolean active;
    private Integer Kun;
    private Integer Soat;
    private Integer Minut;
    private Integer Secund;
}
