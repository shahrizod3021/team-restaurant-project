package b1.restaurant.restaurant_b1.Entity;

import b1.restaurant.restaurant_b1.Entity.AbsEntity.AbsNameEntity;
import com.fasterxml.jackson.databind.DatabindException;
import lombok.*;
import net.bytebuddy.agent.builder.AgentBuilder;

import javax.persistence.Entity;
import javax.persistence.ManyToMany;
import java.util.Date;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
public class Zakaz extends AbsNameEntity {

    private double allPrice;

    private boolean delivered;

    @ManyToMany
    private List<Product> products;

    private Date date;
}
