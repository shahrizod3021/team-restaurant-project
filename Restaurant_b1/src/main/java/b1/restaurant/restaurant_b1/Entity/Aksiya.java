package b1.restaurant.restaurant_b1.Entity;

import b1.restaurant.restaurant_b1.Entity.AbsEntity.AbsNameEntity;
import lombok.*;
import net.bytebuddy.agent.builder.AgentBuilder;

import javax.persistence.Entity;
import javax.persistence.ManyToMany;
import java.util.List;
import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
public class Aksiya extends AbsNameEntity {

    @ManyToMany
    private List<Category> categories;

    @ManyToMany
    private List<Product> products;

    private UUID photoId;

    private Integer foyiz;

    private double allPrice;

    private boolean active;
}
