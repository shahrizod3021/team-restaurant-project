package b1.restaurant.restaurant_b1.Entity;

import lombok.*;
import org.apache.catalina.LifecycleState;
import org.springframework.context.annotation.EnableAspectJAutoProxy;

import javax.persistence.*;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
public class Colors {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String bgColor = "rgb(51, 45, 45)";

    private String textColor = "#fff";


    public Colors(String bgColor, String textColor) {
        this.bgColor = bgColor;
        this.textColor = textColor;
    }
}
