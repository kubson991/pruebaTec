<script setup lang="ts">
type Column<T> = {
  key: string;
  label: string;
  render?: (row: T) => string;
};

interface Props<T> {
  columns: Column<T>[];
  items: T[];
}

defineProps<Props<any>>();
</script>

<template>
  <div class="data-table">
    <table>
      <thead>
        <tr>
          <th v-for="col in columns" :key="col.key" class="preheader">
            {{ col.label }}
          </th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="(item, index) in items" :key="index">
          <td v-for="col in columns" :key="col.key">
            <span v-if="col.render" v-html="col.render(item)" />

            <span v-else>
              {{ item[col.key] }}
            </span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<style lang="scss" scoped>
table {
  overflow: hidden;
  border-top-left-radius: 3.5rem;
  border-top-right-radius: 3.5rem;
  box-shadow: var(--cardShadow);
  border-collapse: separate;
  border-spacing: 0.5rem 1rem;
  thead {
    background-color: var(--base-white);
    color: var(--blue-900);

    th {
      padding: 1rem;
      cursor: help;
    }
  }
  margin-top: 1rem;
  min-width: 100%;
  tbody {
    tr {
      &:hover {
        box-shadow: var(--cardShadowHover);
        cursor: pointer;
      }
      td {
        background-color: var(--base-white);
        text-align: center;
        vertical-align: middle;
        height: 3.5rem;
        color: var(--blue-800);
      }
    }
  }
}
</style>
