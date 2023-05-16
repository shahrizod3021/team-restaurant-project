package b1.restaurant.restaurant_b1.Entity;

import b1.restaurant.restaurant_b1.Entity.AbsEntity.AbsNameEntity;
import lombok.*;

import javax.persistence.Entity;
import javax.persistence.OneToMany;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
public class Restaurant extends AbsNameEntity {

    private double profit;

    @OneToMany
    private List<User> userSize;

    private double dailyProfit;



    public Restaurant(String name, double profit, double dailyProfit) {
        super(name);
        this.profit = profit;
        this.dailyProfit = dailyProfit;
    }
}
