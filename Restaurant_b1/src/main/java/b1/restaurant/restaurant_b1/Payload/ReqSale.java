package b1.restaurant.restaurant_b1.Payload;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ReqSale {
    public String name;
    private double foiz;
    private List<SelectDto> productsId;
}
