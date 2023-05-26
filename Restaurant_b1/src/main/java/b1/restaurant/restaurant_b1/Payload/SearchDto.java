package b1.restaurant.restaurant_b1.Payload;

import b1.restaurant.restaurant_b1.Entity.Category;
import b1.restaurant.restaurant_b1.Entity.Product;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.apache.catalina.LifecycleState;

import javax.swing.event.ListDataEvent;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class SearchDto {
    private String path;
    private Integer categoryId;
    private List<Product> products;
}
