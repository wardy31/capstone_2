<?php

namespace App\Listeners;

use App\Events\ClinicNotification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class SendClinicNotification
{
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     *
     * @param  \App\Events\ClinicNotification  $event
     * @return void
     */
    public function handle(ClinicNotification $event)
    {
        //
    }
}
