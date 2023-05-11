package b1.restaurant.restaurant_b1.Entity;

import b1.restaurant.restaurant_b1.Entity.AbsEntity.AbsNameEntity;
import lombok.*;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
public class Product extends AbsNameEntity {

    @Column(nullable = false, length = 10000)
    private String description;

    @Column(nullable = false)
    private double price;

    @Column(nullable = false)
    private UUID photoId;

    @ManyToOne(optional = false)
    private Category category;

}
