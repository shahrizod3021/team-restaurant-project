package b1.restaurant.restaurant_b1.Entity;

import b1.restaurant.restaurant_b1.Entity.Enums.RoleName;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;

import javax.persistence.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
public class Role implements GrantedAuthority {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Enumerated(value = EnumType.STRING)
    private RoleName roleName;

    public Role(RoleName value) {
        this.roleName = value;
    }


    @Override
    public String getAuthority() {
        return roleName.name();
    }
}
