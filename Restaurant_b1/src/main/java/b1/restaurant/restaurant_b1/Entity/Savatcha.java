package b1.restaurant.restaurant_b1.Entity;

import b1.restaurant.restaurant_b1.Entity.AbsEntity.AbsNameEntity;
import lombok.*;

import javax.persistence.Entity;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
public class Savatcha extends AbsNameEntity {

    @ManyToMany
    private List<Product> product;

    @ManyToMany
    private List<Aksiya> aksiya;

}
