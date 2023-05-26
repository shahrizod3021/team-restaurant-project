package b1.restaurant.restaurant_b1.Entity;

import b1.restaurant.restaurant_b1.Entity.AbsEntity.AbsNameEntity;
import lombok.*;

import javax.persistence.Entity;
import javax.persistence.ManyToMany;
import java.util.Date;
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
    private List<Product> products;

    private UUID photoId;

    private double foyiz;

    private double allPrice;

    private boolean active;

    private double pastPrice;


    private Date sana;

}
