<template>
  <div class="squad">
    <h5 class="squad__title" v-text="'Squad'" />

    <table class="squad__table">
      <thead>
        <tr>
          <th>Position</th>
          <th>Number</th>
          <th>Name</th>
          <th>Age</th>
          <th>Photo</th>
        </tr>
      </thead>
      <tbody>
        <tr
          class="squad__table__row"
          v-for="player in squad?.players"  
        >
          <td 
            class="squad__table__row__data"  
            v-text="ShortPositions[player.position]"
          />
          <td 
            class="squad__table__row__data"  
            v-text="player.number"
          />
          <td 
            class="squad__table__row__data"  
            v-text="player.name"
          />
          <td 
            class="squad__table__row__data"  
            v-text="player.age"
          />
          <td class="squad__table__row__data">
            <img 
              class="squad__table__row__data__photo" 
              :src="player.photo" 
            />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
  import { TeamsSquadT, ShortPositions } from '~/types/team/squad';

  const props = defineProps<{ teamId: number }>()

  const { data: squad } = await useFetch<TeamsSquadT>('/api/team/squad', {
    params: { team: props.teamId }
  })
</script>

<style scoped lang="scss">
  .squad {
    max-height: 45vh;
    overflow-y: auto;

    &__title {
      margin: 0 0 12px;
    }

    &__table {
      width: 100%;
      margin: 0;
      padding: 0;
      list-style: none;

      thead > tr > th {
        padding: 0;
        text-align: start;
        font-size: 11px;
      }

      // space between thead & tbody
      tbody::before {
        content: "@";
        display: block;
        line-height: 10px;
        visibility: hidden;
      }

      &__row {
        &__data {
          &__photo {
            height: 40px;
          }
        }
      }
    }
  }
</style>
