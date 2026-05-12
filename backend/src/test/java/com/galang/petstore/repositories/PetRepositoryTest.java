package com.galang.petstore.repositories;

import com.galang.petstore.models.Pet;
import com.galang.petstore.models.Species;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;

import java.math.BigDecimal;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
public class PetRepositoryTest {

    @Autowired
    private TestEntityManager entityManager;

    @Autowired
    private PetRepository petRepository;

    @Test
    void testFindAll() {
        Pet pet = new Pet();
        pet.setName("Buddy");
        pet.setSpecies(Species.DOG);
        pet.setPrice(new BigDecimal("299.99"));
        entityManager.persist(pet);
        entityManager.flush();

        List<Pet> found = petRepository.findAll();
        assertThat(found).hasSize(1);
        assertThat(found.get(0).getName()).isEqualTo("Buddy");
    }

    @Test
    void testFindBySpecies() {
        Pet dog = new Pet();
        dog.setName("Buddy");
        dog.setSpecies(Species.DOG);
        dog.setPrice(new BigDecimal("299.99"));
        entityManager.persist(dog);

        Pet cat = new Pet();
        cat.setName("Mittens");
        cat.setSpecies(Species.CAT);
        cat.setPrice(new BigDecimal("199.99"));
        entityManager.persist(cat);

        entityManager.flush();

        List<Pet> dogs = petRepository.findBySpecies(Species.DOG);
        assertThat(dogs).hasSize(1);
        assertThat(dogs.get(0).getName()).isEqualTo("Buddy");
    }
}
