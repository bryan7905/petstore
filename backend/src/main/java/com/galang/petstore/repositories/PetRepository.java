package com.galang.petstore.repositories;

import com.galang.petstore.models.Pet;
import com.galang.petstore.models.Species;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface PetRepository extends JpaRepository<Pet, Long> {
    List<Pet> findBySpecies(Species species);
}
