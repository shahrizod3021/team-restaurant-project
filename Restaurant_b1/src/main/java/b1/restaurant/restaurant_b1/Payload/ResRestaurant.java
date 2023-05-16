package b1.restaurant.restaurant_b1.Payload;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ResRestaurant {
    private Integer id;
    private String name;
    private double dailyProfit;
    private double monthlyProfit;
    private Integer userSize;
    private double allProfit;
    private double foydaFoiz;
    private double zarazFoyiz;
    private double kunlikFoydaFoiz;
    private double kunlikZararFoiz;
}
