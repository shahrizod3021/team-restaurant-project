package b1.restaurant.restaurant_b1.Entity;

import b1.restaurant.restaurant_b1.Entity.AbsEntity.AbsEntity;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity(name = "users")
public class User extends AbsEntity implements UserDetails {
    private String name;
    private String lastName;
    private String phoneNumber;

    private String password;

    private String email;

    private UUID photoId;

    @OneToMany
    private List<Zakaz> zakazList;

    @ManyToOne
    private Colors colors;

    @ManyToOne
    private Savatcha savatchas;

    @ManyToOne
    @JoinTable(name = "user_role",
            joinColumns = {@JoinColumn(name = "user_id")},
            inverseJoinColumns = {@JoinColumn(name = "role_id")})
    private Role role;

    private boolean enabled = true;

    private boolean credintialNonExpired = true;
    private boolean accountNonLocked = true;
    private boolean accauntNonExpired = true;
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.singleton(role);
    }

    @Override
    public String getUsername() {
        return phoneNumber;
    }

    @Override
    public boolean isAccountNonExpired() {
        return accauntNonExpired;
    }

    @Override
    public boolean isAccountNonLocked() {
        return accountNonLocked;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return credintialNonExpired;
    }

    @Override
    public boolean isEnabled() {
        return enabled;
    }

    public User(String name, String lastName, String phoneNumber, String password, Role role, Colors colors, Savatcha savatchas) {
        this.name = name;
        this.lastName = lastName;
        this.phoneNumber = phoneNumber;
        this.password = password;
        this.role = role;
        this.colors = colors;
        this.savatchas = savatchas;
    }

    public User(String name, String lastName, String phoneNumber, String password, Role role, Savatcha savatchas) {
        this.name = name;
        this.lastName = lastName;
        this.phoneNumber = phoneNumber;
        this.password = password;
        this.role = role;
        this.savatchas = savatchas;
    }
}
