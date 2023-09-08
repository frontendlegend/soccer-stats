<template>
  <div class="fixture-lineups">
    <h4 class="fixture-lineups__title">Start XI</h4>

    <div class="fixture-lineups__sides">
      <table 
        class="fixture-lineups__sides__side-table"
        v-for="team in fixtureLineups"    
      >
        <thead>
          <tr>
            <th>Pos</th>
            <th>Number</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="{ player } in team.startXI">
            <td>{{ player.pos }}</td>
            <td>{{ player.number }}</td>
            <td>{{ player.name }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { FixtureT } from '~/types/fixtures';
  import { FixtureLineupsT } from '~/types/fixture-lineups';

  const props = defineProps<{ fixture: FixtureT | null }>()

  const { data: fixtureLineups } = 
    await useFetch<FixtureLineupsT>('/api/fixture-lineups', {
      params: { fixture: props.fixture?.fixture.id }
    })
</script>

<style scoped lang="scss">
  .fixture-lineups {
    &__title {
      margin: 0 0 16px;
      text-align: center;
    }

    &__sides {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 32px;

      &__side-table {
        &:not(:first-child) {
          direction: rtl;
        }
  
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
      }
    }

  }
</style>
