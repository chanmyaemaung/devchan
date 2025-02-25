<?php

namespace App\Filament\Resources;

use App\Filament\Resources\SettingResource\Pages;
use App\Filament\Resources\SettingResource\RelationManagers;
use App\Models\Setting;
use Filament\Forms;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Group;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Actions\ActionGroup;
use Filament\Tables\Actions\DeleteAction;
use Filament\Tables\Actions\EditAction;
use Filament\Tables\Actions\ViewAction;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use Filament\Forms\Components\Section;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class SettingResource extends Resource
{
    protected static ?string $model = Setting::class;

    protected static ?string $navigationIcon = 'heroicon-o-cog';
    protected static ?string $navigationGroup = 'General Settings';
    protected static ?string $navigationLabel = 'Settings';
    protected static ?int $navigationSort = 2;

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                // Bio Section
                Section::make('Create Bio Profile')
                    ->description('Basically this is the bio profile section')
                    ->collapsible()
                    ->schema([
                        Group::make()->schema([
                            TextInput::make('greeting_title')
                                ->label(__('Greeting Title'))
                                ->placeholder('Enter greeting title'),
                            TextInput::make('main_title')
                                ->label(__('Main Title'))
                                ->placeholder('Enter main title'),
                        ])->columns(2),


                        Group::make()->schema([
                            Textarea::make('sub_title')
                                ->label(__('Sub Title'))
                                ->placeholder('Enter sub title'),
                        ]),

                        Group::make()->schema([
                            TextInput::make('hero_cta_text')
                                ->label(__('Hero CTA Text'))
                                ->placeholder('Enter hero CTA text'),
                            TextInput::make('hero_cta_link')
                                ->label(__('Hero CTA Link'))
                                ->placeholder('Enter hero CTA link'),
                        ])->columns(2),


                        FileUpload::make('hero_image')
                            ->disk('public')
                            ->directory('bio_profile_images')
                            ->label(__('Hero Image'))
                            ->placeholder('Upload hero image')
                            ->columnSpanFull()
                            ->acceptedFileTypes(['image/*']),
                    ])
                    ->columnSpan(2),

                // Tech Stack Section
                Section::make('Create TechStack Info')
                    ->description('This will be the tech stack section')
                    ->collapsible()
                    ->schema([
                        TextInput::make('tech_stack_title')
                            ->label(__('Tech Stack Title'))
                            ->placeholder('Enter tech stack title'),
                        Textarea::make('tech_stack_sub_title')
                            ->label(__('Tech Stack Sub Title'))
                            ->placeholder('Enter tech stack sub title'),
                    ])
                    ->columnSpan(2),
            ])
            ->columns(4);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('greeting_title')
                    ->label(__('Greeting Title')),
                TextColumn::make('main_title')
                    ->label(__('Main Title'))
                    ->words(3),
                TextColumn::make('sub_title')
                    ->label(__('Sub Title'))
                    ->words(3),
                TextColumn::make('hero_cta_text')
                    ->label(__('Hero CTA Text')),
                TextColumn::make('hero_cta_link')
                    ->label(__('Hero CTA Link')),
                TextColumn::make('tech_stack_title')
                    ->label(__('Tech Stack Title'))
                    ->words(3),
                TextColumn::make('tech_stack_sub_title')
                    ->words(3)
                    ->label(__('Tech Stack Sub Title')),
                TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
                TextColumn::make('updated_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                //
            ])
            ->actions([
                ActionGroup::make([
                    ViewAction::make(),
                    EditAction::make(),
                    // DeleteAction::make(),
                ]),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    // Tables\Actions\DeleteBulkAction::make(),
                ]),
            ])
            ->paginated(false);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListSettings::route('/'),
            'create' => Pages\CreateSetting::route('/create'),
            'edit' => Pages\EditSetting::route('/{record}/edit'),
        ];
    }
}
