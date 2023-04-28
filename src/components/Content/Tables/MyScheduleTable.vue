<template>
  <div class="table-responsive">
    <table class="table table-vcenter card-table table-striped">
      <thead>
        <tr>
          <th>Start Time</th>
          <th>End Time</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="shift in shifts" :key="shift.scheduled_start">
          <td>{{ shift.scheduled_start }}</td>
          <td>{{ shift.scheduled_end }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'ShiftTable',
  props: {
    shifts: {
      type: Array,
      required: true
    }
  }
}
</script>
